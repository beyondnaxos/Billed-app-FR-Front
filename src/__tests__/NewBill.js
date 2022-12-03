/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


function checkExtension(fileName) {
  const extension = fileName.split('.').pop()
  if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
    return true
  }
}

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then on image upload, file extension should be jpeg , jpg or png", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const fileName = 'test.webp'
      expect(checkExtension(fileName)).toBeTruthy()
    })
  })
})
