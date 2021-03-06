import "./App.css";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [chartData, setChartData] = useState({});
  // const [employeeSalary, setemployeeSalary] = useState([]);
  // const [employeeAge, setemployeeAge] = useState([]);

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.data) {
          empSal.push(parseInt(dataObj.employee_salary));
          empAge.push(parseInt(dataObj.employee_age));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "levels of thickness",
              data: empSal,
              backgroundColor: ["rgba(75,192,192,0.6)"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(empSal, empAge);
  };
  useEffect(() => {
    chart();
  }, []);

  const Display = {
    display: "grid",
    placeItems: "center",
    height: "100vh",
    width: "100%",
  };
  return (
    <div style={Display} className="App">
      <div style={{ height: "70%", width: "70%" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICKNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
