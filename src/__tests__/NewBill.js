/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
// import { localStorageMock } from "../__mocks__/localStorage.js"
// import Router from "../app/Router.js"
// import { ROUTES_PATH } from "../constants/routes.js"




describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then icon mail should be highlighted ", async () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      // Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      // window.localStorage.setItem('user', JSON.stringify({
      //   type: 'Employee'
      // }))
      // const root = document.createElement("div")
      // root.setAttribute("id", "root")
      // document.body.append(root)
      // Router()
      // window.onNavigate(ROUTES_PATH.NewBill)
      // await waitFor(() => screen.getByTestId('icon-window'))
      // const windowIcon = screen.getByTestId('icon-window')
      // expect(windowIcon.classList.contains('active-icon')).toBeTruthy()
     
    })
  })
})
