import { expect, test } from '@playwright/test';

test('TS01: Al presionar cada número, aparece ese número en pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');

  for (const num of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
    await page.getByRole('button', { name: 'C', exact: true }).click()
    await page.getByRole('button', { name: num }).click()
    await expect(page.locator('input')).toHaveValue(num)
  }
})

test('TS01b: Al presionar números desde el teclado, aparecen en pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');

  for (const num of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
    await page.getByRole('button', { name: 'C', exact: true }).click()
    await page.keyboard.press(num)
    await expect(page.locator('input')).toHaveValue(num)
  }
})

test('TS02: 1 + 2 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '1' }).click()
  await page.getByRole('button', { name: '+' }).click()
  await page.getByRole('button', { name: '2' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('input')).toHaveValue('3')
})

test('TS03: 5 - 3 = 2', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '5' }).click()
  await page.getByRole('button', { name: '-' }).click()
  await page.getByRole('button', { name: '3' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('input')).toHaveValue('2')
})

test('TS04: 4 * 5 = 20', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '4' }).click()
  await page.getByRole('button', { name: '*', exact: true }).click()
  await page.getByRole('button', { name: '5' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('input')).toHaveValue('20')
})

test('TS05: 9 ÷ 3 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '9' }).click()
  await page.getByRole('button', { name: '/', exact: true }).click()
  await page.getByRole('button', { name: '3' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('input')).toHaveValue('3')
})

test('TS06: Botón C limpia la pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '7' }).click()
  await page.getByRole('button', { name: 'C', exact: true }).click()

  await expect(page.locator('input')).toHaveValue('')
})

test('TS07: Backspace elimina último dígito', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '8' }).click()
  await page.getByRole('button', { name: '9' }).click()
  await page.getByRole('button', { name: 'Backspace', exact: true }).click()

  await expect(page.locator('input')).toHaveValue('8')
})

test('TS08: División por cero muestra error', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: '5' }).click()
  await page.getByRole('button', { name: '/', exact: true }).click()
  await page.getByRole('button', { name: '0' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('input')).toHaveValue('Error')
})

test('TS09: Entrada usando teclado físico: 7 + 2 = 9', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.keyboard.press('7')
  await page.keyboard.press('+')
  await page.keyboard.press('2')
  await page.keyboard.press('Enter')

  await expect(page.locator('input')).toHaveValue('9')
})

// TS10 - No debe permitir operadores repetidos (1 + + 1 → 2)
test('TS10 - No debe permitir operadores repetidos (1 + + 1 → 2)', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click(); // Repetido
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = await page.locator('input').inputValue();
  expect(display).toBe('2');
});

// TS11 - Debe reemplazar operador si es diferente (10 + - 2 → 8)
test('TS11 - Debe reemplazar operador si es diferente (10 + - 2 → 8)', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '-' }).click(); // Reemplaza +
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = await page.locator('input').inputValue();
  expect(display).toBe('8');
});

// TS12 - Comprobación de operación válida sin interferencia (7 * 3 = 21)
test('TS12 - Comprobación de operación válida sin interferencia (7 * 3 = 21)', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '*' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '=' }).click();

  const display = await page.locator('input').inputValue();
  expect(display).toBe('21');
});

// TS13 - Teclado físico: 1 + + 1 debe dar 2 (operador repetido ignorado)
test('TS13 - Teclado físico: 1 + + 1 debe dar 2', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.keyboard.type('1++1');
  await page.keyboard.press('Enter');

  const display = await page.locator('input').inputValue();
  expect(display).toBe('2');
});

// TS14 - Teclado físico: 10 + - 2 debe dar 8 (reemplazo de operador)
test('TS14 - Teclado físico: 10 + - 2 debe dar 8', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.keyboard.type('10+-2');
  await page.keyboard.press('Enter');

  const display = await page.locator('input').inputValue();
  expect(display).toBe('8');
});
