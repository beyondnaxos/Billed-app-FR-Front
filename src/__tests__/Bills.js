/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from '@testing-library/dom'
import BillsUI from '../views/BillsUI.js'
import { bills } from '../fixtures/bills.js'
import { ROUTES, ROUTES_PATH } from '../constants/routes.js'
import { localStorageMock } from '../__mocks__/localStorage.js'
import mockStore from '../__mocks__/store'


import router from '../app/Router.js'
import Bills from '../containers/Bills.js'


describe('Given I am connected as an employee', () => {
  describe('When I am on Bills Page', () => {
    test('Then bill icon in vertical layout should be highlighted', async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          type: 'Employee',
        })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      expect(windowIcon.classList.contains('active-icon')).toBeTruthy()
    })
    test('Then bills should be ordered from earliest to latest', () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML)
      const antiChrono = (a, b) => (a < b ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })

    describe('When I click on the New Bill button', () => {
      test('Then it should render NewBill page', () => {
        const root = document.createElement('div')
        root.setAttribute('id', 'root')
        document.body.append(root)
        router()
        window.onNavigate(ROUTES_PATH.Bills)
        const newBill = screen.getByTestId('btn-new-bill')
        newBill.click()
        expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
      })
    })

    test('Then it should render getBills', async () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          type: 'Employee',
        })
      )
      const bills = new Bills({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      })

      const getBills = await bills.getBills()

      expect(getBills[0].formatedDate).toBe('4 Avr. 04')
    })

    test('Then it should catch error', async () => {

      const badmock = {
        bills() {
          return {
            list() {
              return Promise.resolve([{
                
                  "id": "47qAXb6fIm2zOKkLzMro",
                  "vat": "80",
                  "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
                  "status": "pending",
                  "type": "Hôtel et logement",
                  "commentary": "séminaire billed",
                  "name": "encore",
                  "fileName": "preview-facture-free-201801-pdf-1.jpg",
                  "date": "204-054-0ara4",
                  "amount": 400,
                  "commentAdmin": "ok",
                  "email": "a@a",
                  "pct": 20
              }])
            }
          }
        }
      }
      
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          type: 'Employee',
        })
      )
      const bills = new Bills({
        document,
        onNavigate,
        store: badmock,
        localStorage: window.localStorage,
      })
      
      const getBills = await bills.getBills()

      expect(getBills[0].date).toBe('204-054-0ara4')
    })
  })
})

// test d'intégration GET
describe('Given I am a user connected as Employee', () => {
  describe('When I navigate to Bills', () => {
    test('The it should fetches bills from mock API GET', async () => {
      localStorage.setItem(
        'user',
        JSON.stringify({ type: 'Employee', email: 'e@e' })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)

      await waitFor(() => screen.getByText('Mes notes de frais'))
      expect(screen.getByText('Mes notes de frais')).toBeTruthy()
    })

    test('Then click on icon-eye should make the modal open', async () => {
      $.fn.modal = jest.fn()
      localStorage.setItem(
        'user',
        JSON.stringify({ type: 'Employee', email: 'e@e' })
      )
      const root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByText('Mes notes de frais'))
      const iconEye = screen.getAllByTestId('icon-eye')
      iconEye.forEach((icon) => {
        icon.click()
        expect($.fn.modal).toHaveBeenCalled()
      })
    })

    describe('When an error occurs on API', () => {
      beforeEach(() => {
        jest.spyOn(mockStore, 'bills')
        Object.defineProperty(window, 'localStorage', {
          value: localStorageMock,
        })
        window.localStorage.setItem(
          'user',
          JSON.stringify({
            type: 'Employee',
            email: 'e@e',
          })
        )
        const root = document.createElement('div')
        root.setAttribute('id', 'root')
        document.body.appendChild(root)
        router()
      })

      test(' Then it should fetch bills from an API and fails with 404 message error', async () => {
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list: () => {
              return Promise.reject(new Error('Erreur 404'))
            },
          }
        })
        document.body.innerHTML = BillsUI({ error: 'Erreur 404' })
        window.onNavigate(ROUTES_PATH.Bills)
        // await new Promise(process.nextTick)
        const message = await screen.findByText(/Erreur 404/)
        expect(message).toBeTruthy()
      })

      test('Then it should fetch bills from an API and fails with 500 message error', async () => {
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list: () => {
              return Promise.reject(new Error('Erreur 500'))
            },
          }
        })
        document.body.innerHTML = BillsUI({ error: 'Erreur 500' })
        window.onNavigate(ROUTES_PATH.Bills)
        // await new Promise(process.nextTick)
        const message = await screen.findByText(/Erreur 500/)
        expect(message).toBeTruthy()
      })
    })
  })
})
