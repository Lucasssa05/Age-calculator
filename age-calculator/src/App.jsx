import { useState } from "react";

export default function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    setError("");
    const birthDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(birthDate) || birthDate > new Date()) {
      setError("Data inválida. Insira uma data válida no passado.");
      return;
    }

    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });
  };

  // Reset age whenever any input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setAge(null);  // Reset the age display whenever an input changes
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Calculadora de Idade</h2>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Dia"
            className="border p-2 w-1/3"
            value={day}
            onChange={handleInputChange(setDay)} // Call to reset age
          />
          <input
            type="number"
            placeholder="Mês"
            className="border p-2 w-1/3"
            value={month}
            onChange={handleInputChange(setMonth)} // Call to reset age
          />
          <input
            type="number"
            placeholder="Ano"
            className="border p-2 w-1/3"
            value={year}
            onChange={handleInputChange(setYear)} // Call to reset age
          />
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <button className="mt-4 bg-blue-500 text-white p-2 w-full rounded" onClick={calculateAge}>Calcular</button>
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
