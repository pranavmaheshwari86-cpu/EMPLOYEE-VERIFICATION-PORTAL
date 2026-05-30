from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        print("Navigating to http://localhost:3000")
        page.goto("http://localhost:3000")
        time.sleep(2)
        
        # Click through Landing Page
        print("Clicking Features link")
        page.click("text=Features")
        time.sleep(1)
        
        print("Clicking Login link")
        page.click("text=Login")
        time.sleep(2)
        
        # We are on login page, fill and submit
        print("Filling login form")
        page.fill("input[placeholder='Email coordinates']", "alex@aetheris.com")
        page.fill("input[placeholder='Access code']", "password")
        page.click("button[type='submit']")
        time.sleep(3)
        
        print("Current URL:", page.url)
        
        # We should be on dashboard
        print("Clicking Verification tab")
        try:
            page.click("text=Verification")
            time.sleep(2)
        except Exception as e:
            print("Could not click Verification:", e)
            
        print("Clicking Documents tab")
        try:
            page.click("text=Documents")
            time.sleep(2)
        except Exception as e:
            print("Could not click Documents:", e)
            
        print("Logging out")
        try:
            page.click("text=Sign Out")
            time.sleep(2)
        except Exception as e:
            print("Could not click Sign out:", e)
            
        browser.close()

if __name__ == "__main__":
    run()
