// Given
describe('O sistema funcionando, com a campanha de id 1 cadastrada', () => {
    // When
    describe('O usuário consumidor solicita a visualização', () => {
        // Then
        test('Os dados da campanha de id 1 devem ser retornados', () => {
            const getCampain = (id) => {};

            expect(getCampain(1)).toBe({
                id: 1,
                name: 'Black Friday',
                startDate: '2024-11-10',
                endDate: '2024-11-11'
            })
        })
    })
})