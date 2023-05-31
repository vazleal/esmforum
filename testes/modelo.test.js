const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  const pergunta_0 = modelo.get_pergunta(perguntas[0].id_pergunta);
  const pergunta_1 = modelo.get_pergunta(perguntas[1].id_pergunta);
  expect(perguntas.length).toBe(3);
  expect(pergunta_0.texto).toBe('1 + 1 = ?');
  expect(pergunta_1.texto).toBe('2 + 2 = ?');
  expect(perguntas[1].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  modelo.cadastrar_resposta(0, '2');
  modelo.cadastrar_resposta(1, '4');
  modelo.cadastrar_resposta(2, '6');
  const respostas_pergunta_0 = modelo.get_respostas(0);
  const respostas_pergunta_1 = modelo.get_respostas(1);
  expect(respostas_pergunta_0.length).toBe(1);
  expect(respostas_pergunta_0[0].texto).toBe('2');
  expect(respostas_pergunta_1[0].texto).toBe('4');
  expect(modelo.get_num_respostas(1)).toBe(1);
});
