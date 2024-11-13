// Given
describe('O sistema funcionando, com a home sendo exibida na tela do usuario', () => {
    // When
    describe('O usuário clica no botão', () => {
        // Then
        test('Um evento de clique de botão deve ser criado e resgatado', () => {
            const clickButton = (buttonId) => {};
            const getLastEvent = () => {};

            clickButton('#ActionButton')
            setTimeout(() => {
                expect(getLastEvent()).toBe({
                    id: 32,
                    name: 'Click button Home',
                    userId: 1
                })
            }, 5000);
            
        })
    })
})