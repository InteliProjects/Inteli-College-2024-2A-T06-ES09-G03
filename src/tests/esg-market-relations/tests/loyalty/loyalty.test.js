// Given
describe('Um usuário novo, não cadastrado no loyalty', () => {
    // When
    describe('O usuário solicita inscrição', () => {
        // Then
        test('Deve ser criado uma nova inscrição com 0 pontos', () => {
            const user = {
                id: 1,
                name: 'Rafael',
                loyalty: null,
                subscribeLoyalty: () => {}
            }


            user.subscribeLoyalty();

            expect(user.loyalty).toBe(0)
        })
    })
})