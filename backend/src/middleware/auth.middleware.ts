import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import prisma from '../lib/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    const token = authHeader.split(' ')[1];
    
    // DEV BYPASS for Supabase rate limit testing
    if (process.env.NODE_ENV === 'development' && token.startsWith('dev-bypass-token|')) {
      const email = token.split('|')[1];
      const stableId = `dev-bypass-${Buffer.from(email).toString('hex')}`;
      req.user = { id: stableId, email };
      return next();
    }

    // Supabase will verify the JWT signature automatically
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // Attach user payload
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authorize = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (req.user.id?.startsWith('dev-bypass-')) {
        req.user.dbId = req.user.dbId || req.user.id || 'dev-db-id';
        req.user.role = req.user.role || roles[0] || 'EMPLOYEE';
        return next();
      }
      
      let dbUser: any = null;
      try {
        dbUser = await prisma.user.findUnique({
          where: { email: req.user.email }
        });
      } catch (dbErr) {
        console.warn("DB connection error in authorize middleware, using dev fallback:", dbErr);
        if (process.env.NODE_ENV === 'development') {
          req.user.dbId = req.user.dbId || req.user.id || 'dev-db-id';
          req.user.role = req.user.role || roles[0] || 'EMPLOYEE';
          return next();
        }
      }
      
      if (!dbUser && process.env.NODE_ENV === 'development') {
        req.user.dbId = req.user.dbId || req.user.id || 'dev-db-id';
        req.user.role = req.user.role || roles[0] || 'EMPLOYEE';
        return next();
      }

      if (!dbUser || !roles.includes(dbUser.role)) {
        return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
      }
      
      // Merge dbUser data into req.user
      req.user.dbId = dbUser.id;
      req.user.role = dbUser.role;
      next();
    } catch (error) {
      console.error('Role authorization error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
