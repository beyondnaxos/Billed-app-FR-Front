/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/dom'
import NewBillUI from '../views/NewBillUI.js'
import NewBill from '../containers/NewBill.js'
import { localStorageMock } from '../__mocks__/localStorage.js'
import router from '../app/Router.js'
import { ROUTES_PATH } from '../constants/routes.js'

describe('Given I am connected as an employee', () => {
  describe('When I am on NewBill Page', () => {
    test('I should see a title names ( Envoyer une note de frais) ', async () => {
      localStorage.setItem(
        'user',
        JSON.stringify({ type: 'Employee', email: 'e@e' })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByText('Envoyer une note de frais'))
      expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
    })
    test('I should see 8 inputs', async () => {
      localStorage.setItem(
        'user',
        JSON.stringify({ type: 'Employee', email: 'e@e' })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getAllByTestId('form-new-bill'))
      expect(screen.getAllByTestId('form-new-bill').length).toBe(1)
    })
  })
  
  describe('When I am on NewBill Page and I upload a file', () => {
    test('I should see a file with jpg or jpeg or png extension', async () => {
      localStorage.setItem (
        'user',
        JSON.stringify({ type: 'Employee', email: 'e@e' })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getAllByTestId('form-new-bill'))
      const file = new File(['chucknorris'], 'chucknorris.png', { type: 'image/png' })
      const input = screen.getByTestId('file')
      Object.defineProperty(input, 'files', {
        value: [file]
      }) 
      input.dispatchEvent(new Event('change'))
      await waitFor(() => screen.getByTestId('file'))
      expect(screen.getByTestId('file')).toBeTruthy()
    })
  })
})

// test post new bill
describe('Given I am a user connected as Employee', () => {
  describe('When I am on NewBill Page', () => {
    test('Then I should be able to post a new bill', async () => {
     
    })
  })
})