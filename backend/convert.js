const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Provider
schema = schema.replace('provider = "postgresql"', 'provider = "mongodb"');

// 2. UUID IDs to MongoDB ObjectIds
schema = schema.replace(/String\s+@id\s+@default\(uuid\(\)\)/g, 'String @id @default(auto()) @map("_id") @db.ObjectId');

// 3. PostgreSQL specific db attributes
schema = schema.replace(/@db\.VarChar\(\d+\)/g, '');
schema = schema.replace(/@db\.Text/g, '');

// 4. Json -> String
schema = schema.replace(/Json\?/g, 'String?');
schema = schema.replace(/Json/g, 'String');

// 5. Foreign keys (e.g. userId String -> userId String @db.ObjectId)
// This matches lines like "  userId String" or "  companyId String"
// It ensures we don't accidentally match something else.
schema = schema.replace(/^(\s+\w+Id\s+String)(\?)?(\s*(?:@unique)?)$/gm, '$1$2 @db.ObjectId$3');

// 6. Prisma MongoDB requires unique constraints that combine foreign keys to also be properly supported.
// No syntax changes needed for unique block level.

fs.writeFileSync(schemaPath, schema);
console.log('Schema converted successfully.');
