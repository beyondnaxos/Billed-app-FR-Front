/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"




describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then icon mail should be highlighted ", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      // const verticalLayout = document.querySelector(".vertical-navbar")
      // const iconMail = verticalLayout.querySelector("#icon-mail")
      // to-do write assertion
      expect(iconMail.classList.contains("active-icon")).toBeTruthy()

     
    })
  })
})
