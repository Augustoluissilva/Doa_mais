import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Registrar componentes do ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [bloodStock, setBloodStock] = useState({
    'A+': { amount: 15, level: 'sufficient' },
    'A-': { amount: 8, level: 'moderate' },
    'B+': { amount: 12, level: 'sufficient' },
    'B-': { amount: 5, level: 'critical' },
    'AB+': { amount: 10, level: 'sufficient' },
    'AB-': { amount: 7, level: 'moderate' },
    'O+': { amount: 20, level: 'sufficient' },
    'O-': { amount: 3, level: 'critical' },
  });

  const [alerts] = useState([
    "Tipo O- está com estoque crítico. Agende sua doação!",
    "Tipo B- está com estoque abaixo do nível seguro.",
    "Estoque de A- está moderado. Sua doação é importante!"
  ]);

  const fetchStockData = () => {
    // Simulação de atualização de dados
    setBloodStock(prev => ({
      ...prev,
      'O-': { 
        amount: Math.max(0, prev['O-'].amount - 1), 
        level: prev['O-'].amount - 1 <= 3 ? 'critical' : 'moderate' 
      },
      'B-': {
        amount: Math.max(0, prev['B-'].amount - 1),
        level: prev['B-'].amount - 1 <= 5 ? 'critical' : 'moderate'
      }
    }));
  };

  const chartData = {
    labels: Object.keys(bloodStock),
    datasets: [
      {
        label: 'Estoque de Sangue (bolsas)',
        data: Object.values(bloodStock).map(item => item.amount),
        backgroundColor: Object.values(bloodStock).map(item => 
          item.level === 'critical' ? '#d32f2f' : 
          item.level === 'moderate' ? '#ffa000' : '#388e3c'
        ),
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Estoque de Sangue por Tipo',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} bolsas`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantidade (bolsas)',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          stepSize: 5
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard de Estoque de Sangue</h1>
        <div className="dashboard-actions">
          <button 
            className="update-button" 
            onClick={fetchStockData}
            aria-label="Atualizar dados do estoque"
          >
            Atualizar Dados
          </button>
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
            aria-label="Voltar para página anterior"
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="chart-wrapper">
        <div className="chart-container">
          <Bar 
            data={chartData} 
            options={chartOptions}
            aria-label="Gráfico de estoque de sangue por tipo sanguíneo"
          />
        </div>
      </div>

      <div className="blood-stock-grid">
        {Object.entries(bloodStock).map(([type, data]) => (
          <div 
            key={type} 
            className={`blood-card blood-card--${data.level}`}
            aria-label={`Estoque ${type}: ${data.amount} bolsas, nível ${data.level}`}
          >
            <h3 className="blood-type">{type}</h3>
            <p className="blood-amount">{data.amount} <span>bolsas</span></p>
            <p className="blood-status">
              {data.level === 'critical' ? 'Crítico' : 
               data.level === 'moderate' ? 'Moderado' : 'Suficiente'}
            </p>
          </div>
        ))}
      </div>

      {alerts.length > 0 && (
        <div className="alerts-section">
          <h2 className="alerts-title">Alertas de Estoque</h2>
          <ul className="alerts-list">
            {alerts.map((alert, index) => (
              <li key={index} className="alert-item">
                <span className="alert-icon">⚠️</span>
                <span className="alert-text">{alert}</span>
              </li>
            ))}
          </ul>
          <button 
            className="donate-button"
            onClick={() => navigate('/agendar')}
            aria-label="Agendar doação de sangue"
          >
            Agendar Doação
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;