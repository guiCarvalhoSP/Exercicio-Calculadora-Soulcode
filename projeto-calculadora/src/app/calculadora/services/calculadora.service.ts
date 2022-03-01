import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly DIVISAO: string = '/';
  static readonly MULTIPLICACAO: string = '*';
  static readonly RAIZ: string = '√';
  static readonly QUADRADO: string = '^2';
  static readonly CUBO: string = '^3';

  constructor() { }

  /**
   * Método que calcula uma operação matematica dado dois números.
   * Suporta operações de somma, subtração, divisão e multiplicação.
   * @param num1 number
   * @param num2  number
   * @param operacao  string| operação a ser executada
   * @returns number Resultado da operacao
   */

   raiz(num1: number):number {
    let resultado: number;
    resultado = Math.sqrt(num1);
    num1 = resultado
    return resultado;
  }
  quadrado(num1: number):number {
    let resultado: number;
    resultado = Math.pow(num1 ,2);
    return resultado;
  }
  cubo(num1: number):number {
    let resultado: number;
    resultado = Math.pow(num1, 3);
    return resultado;
  }
  
  pi(num: number):number {
    let resultado:number;
    resultado = num * Math.PI
    return resultado
  }
 
 
  calcular(num1: number, num2: number, operacao: string): number {
  let resultado: number;

  switch (operacao) {
    case CalculadoraService.SOMA:
      resultado = num1 + num2;
      break;
    case CalculadoraService.SUBTRACAO:
      resultado = num1 - num2;
      break;
    case CalculadoraService.MULTIPLICACAO:
      resultado = num1 * num2;
      break;
    case CalculadoraService.DIVISAO:
      resultado = num1 / num2;
      break;
    default:
      resultado = 0;
      break;
  }
  return resultado;
}
}
