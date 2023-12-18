import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

beforeEach(() => render(<IletisimFormu/>))

test('hata olmadan render ediliyor', () => {});

test('iletişim formu headerı render ediliyor', () => {
    const header = screen.getByText(/İletişim Formu/i);
    expect(header).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    const nameInput = screen.getByTestId("ad-input");
    userEvent.type(nameInput, "Foo");
    screen.getByText("Hata: ad en az 5 karakter olmalıdır.")
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
   const summit=screen.getByTestId("submit-btn");
   fireEvent.click(summit);
   screen.getByTestId("ad-error");
   screen.getByTestId("soyad-error");
   screen.getByTestId("email-error");
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    const nameInput = screen.getByTestId("ad-input");
    userEvent.type(nameInput, "osman");

    const surnameInput = screen.getByTestId("soyad-input");
    userEvent.type(surnameInput, "ilhan");

    const summit=screen.getByTestId("submit-btn");
    fireEvent.click(summit);

    screen.getByTestId("email-error");


});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
   const emailInput=screen.getByTestId("email-input")
   userEvent.type(emailInput,"affafa@")
   screen.getByText("Hata: email geçerli bir email adresi olmalıdır.")


});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    const nameInput = screen.getByTestId("ad-input");
    const emailInput=screen.getByTestId("email-input")
    const summit=screen.getByTestId("submit-btn");
    fireEvent.click(summit);
    screen.getByTestId("soyad-error");

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    const nameInput = screen.getByTestId("ad-input");
    userEvent.type(nameInput, "osman");

    const surnameInput = screen.getByTestId("soyad-input");
    userEvent.type(surnameInput, "ilhan");

    const emailInput=screen.getByTestId("email-input")
    userEvent.type(emailInput, "osmnlhn@gmail.com");

    const summit=screen.getByTestId("submit-btn");
    fireEvent.click(summit);



    expect(screen.queryByTestId("ad-error")).toBeNull();
    expect(screen.queryByTestId("soyad-error")).toBeNull();
    expect(screen.queryByTestId("email-error")).toBeNull();

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

    const nameInput = screen.getByTestId("ad-input");
    userEvent.type(nameInput, "osman");

    const surnameInput = screen.getByTestId("soyad-input");
    userEvent.type(surnameInput, "ilhan");

    const emailInput=screen.getByTestId("email-input")
    userEvent.type(emailInput, "osmnlhn@gmail.com");

    const mesajInput=screen.getByTestId("mesaj-input")
    userEvent.type(mesajInput,"tamam")

    const summit=screen.getByTestId("submit-btn");
    fireEvent.click(summit);

    const gDiv=screen.getByTestId("goruntule-div")
    expect(gDiv).toBeInTheDocument();


});
