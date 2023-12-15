// @ts-check
const { test, expect } = require("@playwright/test");


test.beforeEach('"Perform Login"', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator('//*[@id="login-button"]').click();
});

  test(" Test 1 Check Product Main page", async ({ page }) => {
   
  
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page.locator('div#shopping_cart_container')).toBeVisible();
    
    const elements = await page.locator('//*[@class="inventory_item_name "]').allTextContents()

    await expect(elements.length).toBeGreaterThan(1);


    
  });

  test('Test 2 Add product to the cart', async ({ page }) => {
    const productTitleMainPage = await page.locator('#item_4_title_link').textContent();
    const productDescriptionMainPage = await page.locator('#item_4_title_link + div').textContent();

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('//*[@class="shopping_cart_badge"]')).toBeVisible()
    await expect(page.locator('//*[@class="shopping_cart_badge"]')).toHaveText('1')
    await page.locator('a.shopping_cart_link').click();
    

    const productTitleCart = await page.locator('div.cart_item_label > a > div').textContent();
    const productDescriptionCart = await page.locator('div.cart_item_label > div.inventory_item_desc').textContent();

    await expect(productTitleMainPage).toEqual(productTitleCart)
    await expect(productDescriptionMainPage).toEqual(productDescriptionCart)
    
    await page.locator('#remove-sauce-labs-backpack').click();
    await expect(page.locator('div.cart_item')).not.toBeVisible()
    
  })

