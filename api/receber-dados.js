let ultimoPayload = {}; // Variável para armazenar o último payload recebido

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Salva os dados recebidos no POST
    ultimoPayload = req.body;
    console.log('Dados recebidos:', ultimoPayload);

    // Retorna uma mensagem de sucesso
    return res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  }

  if (req.method === 'GET') {
    // Retorna os últimos dados recebidos no POST
    return res.status(200).json(ultimoPayload);
  }

  // Retorna erro para métodos diferentes de POST e GET
  res.status(405).json({ message: 'Método não permitido' });
}
