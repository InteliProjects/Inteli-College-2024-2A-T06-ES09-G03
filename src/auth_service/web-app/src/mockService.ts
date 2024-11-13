export class MockService {

    static callCountsPrivacidade = 0; 
    static callCountsDisponibilidade = 0; 
    static primaryDisabled: boolean;

    static GetVolumeDeServicos(service: string): string {
      if (service === 'rampa') return 'Baixa Demanda';
      return 'Pico Normal';
    }
  
    static CheckDisponibilidade(): boolean {
      this.callCountsDisponibilidade++;

      return this.callCountsDisponibilidade % 2 === 1;
    }
  
    static CheckPrivacidade(data: string): string {
      this.callCountsPrivacidade++;

      if (this.callCountsPrivacidade % 2 === 1 && data.includes('password')) {
        return 'Criptografado';
      } else {
        return 'Ofuscado';
      }
    }
  
    static CheckIntegridade(data: string): string {
      return data.includes('checksum=abc123') ? 'Checksum válido' : 'Checksum inválido';
    }
  
    static RegistrarTransacao(data: string): string {
      return data.includes('eventos=[]') ? 'Falta de rastreabilidade' : 'Rastreabilidade completa';
    }
}
  