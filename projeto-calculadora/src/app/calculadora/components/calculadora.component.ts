import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  private numero1!: string;
  private numero2!: string;
  private resultado!: number;
  private operacao!: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.limpar();
  }
  /**
   * Inicializando todos os operadores para valores padrão.
   * 
   * @return void - retorna algo vazio/neutro
   */

  limpar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Retonar o valor concatenado. Trata o separdor decimal.
   * 
   * @param numAtual string
   * @param numConcat string
   * @return string
   */

  concatenaNumero(numAtual: string, numConcat: string): string {
    //caso contanha apenas '0' ou null, reinicializar o valor
    if (numAtual === '0' || numAtual == null) {
      numAtual = '';
    }

    //primeiro digito e '.', concatena '0' antes do ponto
    if (numConcat === '.' && numAtual === '') {
      return '0.';
    }

    //caso'.' digitado e já contenha um '.', apenas retorna
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }

    return numAtual + numConcat;

  }
  /**
   * Adiciona o numero selecionado
   * para o calculo posteriormente.
   * 
   * @param numero string
   * @return void
   * 
   */

  adicionarNumero(numero: string): void {
    if (this.resultado !== null) {
      this.limpar();
    }
    if (this.operacao == null) {
      this.numero1 = this.concatenaNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenaNumero(this.numero2, numero);
    }
  }

  definirOperacao(operacao: string): void {

    //apenas define a operação caso não exista uma
    if (this.operacao == null) {
      this.operacao = operacao;
      return;
    }

    if (this.numero2 != null) {
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao
      );
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  raiz(): void {
    this.resultado = this.calculadoraService.raiz(
      parseFloat(this.numero1));
    this.numero1 = this.resultado.toString()
  }
  quadrado(): void {
    this.resultado = this.calculadoraService.quadrado(
      parseFloat(this.numero1));
    this.numero1 = this.resultado.toString()

  }
  cubo(): void {
    this.resultado = this.calculadoraService.cubo(
      parseFloat(this.numero1));
    this.numero1 = this.resultado.toString()

  }
  delete() {
    if (this.numero2 === null) {
      this.numero1 = this.numero1.toString().slice(0, -1);
    } else {
      this.numero2 = this.numero2.toString().slice(0, -1);
    }
  }

  pi(): void {
    if (this.numero1 === '0' || !this.numero1)
      this.resultado = Math.PI
    if (this.numero2 === null) {
      this.numero1 = this.calculadoraService.pi(parseFloat(this.numero1)).toString();
    } else if (this.numero2 !== null) {
      this.numero2 = this.calculadoraService.pi(parseFloat(this.numero2)).toString();
    }
  }

  converte(): void {
    let num1 = parseFloat(this.numero1);
    let num2 = parseFloat(this.numero2);

    if (this.numero2 === null) {
      num1 = (num1 * -1);
      this.numero1 = num1.toString()

    } else {
      num2 = (num2 * -1);
      this.numero2 = num2.toString()
    }

  }

  /**
   * Efetua o calculo de uma operação.
   * @return void 
   */

  calcular(): void {
    if (this.numero2 == null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao
    );
  }

  get display(): string {
    if (this.resultado != null) {
      return this.resultado.toString();
    }

    if (this.numero2 != null) {
      return this.numero2.toString();
    }

    return this.numero1.toString();
  }

}
