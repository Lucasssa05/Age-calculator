import { useState } from "react"; // Importa o hook useState para gerenciar estados no componente

export default function AgeCalculator() { 
  // Define estados para armazenar dia, mês, ano, idade calculada e mensagens de erro
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    setError(""); // Reseta a mensagem de erro antes de cada cálculo
    
    // Cria um objeto Date com os valores informados
    const birthDate = new Date(`${year}-${month}-${day}`);

    // Verifica se a data é inválida ou está no futuro
    if (isNaN(birthDate) || birthDate > new Date()) {
      setError("Data inválida. Insira uma data válida no passado.");
      return;
    }

    const today = new Date(); // Obtém a data atual
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajusta os meses e dias caso a data de nascimento ainda não tenha sido atingida no ano atual
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days }); // Atualiza o estado com a idade calculada
  };

  // Função para lidar com mudanças nos inputs e resetar a idade calculada ao alterar qualquer campo
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setAge(null);  // Reseta a idade quando um novo valor é inserido
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Container principal estilizado */}
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Calculadora de Idade</h2>
        
        {/* Inputs para inserção da data de nascimento */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Dia"
            className="border p-2 w-1/3"
            value={day}
            onChange={handleInputChange(setDay)} // Atualiza o estado do dia
          />
          <input
            type="number"
            placeholder="Mês"
            className="border p-2 w-1/3"
            value={month}
            onChange={handleInputChange(setMonth)} // Atualiza o estado do mês
          />
          <input
            type="number"
            placeholder="Ano"
            className="border p-2 w-1/3"
            value={year}
            onChange={handleInputChange(setYear)} // Atualiza o estado do ano
          />
        </div>

        {/* Exibe mensagem de erro caso a data seja inválida */}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {/* Botão para calcular a idade */}
        <button className="mt-4 bg-blue-500 text-white p-2 w-full rounded" onClick={calculateAge}>
          Calcular
        </button>

        {/* Exibe a idade calculada se válida */}
        {age && (
          <div className="mt-4 text-center animated">
            <p><strong>{age.years}</strong> anos</p>
            <p><strong>{age.months}</strong> meses</p>
            <p><strong>{age.days}</strong> dias</p>
          </div>
        )}
      </div>
    </div>
  );
}
