import {describe, expect, test} from '@jest/globals';
// import {Basket} from "@/lib/utils";
import {Basket} from '../utils';
test('adds item to basket', () => {
    const basket = new Basket();
    basket.add("coke")
    expect(basket.size).toBe(1)
})

// test for empty basket
// ask for quantity of coke
// returns zero

// test('checks for item qty', () => {
//     const basket = new Basket();
//     basket.add("coke")
//     expect(basket.quantity("coke")).toBe(1)
// })


test('generates receipt', () => {
    const basket = new Basket();
    expect(basket.generateReceipt()).toBe("Total: £0.00")
})

test('adds an item and generates a receipt', () => {
    const basket = new Basket();
    basket.add("coke")
    basket.add("pepsi")
    basket.add("coke")
    basket.add("fanta")
    expect(basket.generateReceipt()).toBe("1) coke. 2 @ £2.00 = £4.00\n2) pepsi. 1 @ £2.50 = £2.50\n3) fanta. 1 @ £3.00 = £3.00\nTotal: £9.50")
})