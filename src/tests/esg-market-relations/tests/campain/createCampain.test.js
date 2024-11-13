// Given
describe('O sistema funcionando, sem nenhuma campanha cadastrada', () => {
    // When
    describe('O usuário administrator solicita criação', () => {
        // Then
        test('Deve ser criado uma nova campanha', () => {
            const campain = {
                name: 'Black Friday',
                startDate: '2024-11-10',
                endDate: '2024-11-11',
                create: () => {}
            }

            campain.create();

            expect(campain).toBe({
                id: 1,
                name: 'Black Friday',
                startDate: '2024-11-10',
                endDate: '2024-11-11',
                create: () => {}
            })
        })
    })
})