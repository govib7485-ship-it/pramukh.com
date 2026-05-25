import { useEffect, useState } from "react";

export default function App() {

  const ADMIN_EMAIL = "ydarji780@gmail.com";
  const ADMIN_PASSWORD = "yash@1806A";

  const [page, setPage] = useState("home");

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2026");

  const [employees, setEmployees] = useState([]);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [employeeData, setEmployeeData] = useState({
    name: "",
    designation: "",
    mobile: "",
    presentDays: "",
    otHours: "",
    otDays: "",
    totalDays: "",
    hogSalary: "",
    addHog: "",
    advance: "",
  });

  const key = `employees-${month}-${year}`;

  useEffect(() => {

    const savedLogin =
      localStorage.getItem("pf-user");

    const savedAdmin =
      localStorage.getItem("pf-admin");

    if (savedLogin) {
      setIsLoggedIn(true);
    }

    if (savedAdmin === "true") {
      setIsAdmin(true);
    }

  }, []);

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem(key)) || [];

    setEmployees(data);

  }, [month, year]);

  const addEmployee = () => {

    const otDays =
      Number(employeeData.otHours || 0) / 24;

    const totalDays =
      Number(employeeData.presentDays || 0) + otDays;

    const actualSalary =
      (
        Number(employeeData.hogSalary || 0)
        *
        totalDays
      )
      +
      Number(employeeData.addHog || 0)
      -
      Number(employeeData.advance || 0);

    const newEmployee = {
      ...employeeData,
      otDays: otDays.toFixed(1),
      totalDays: totalDays.toFixed(1),
      actualSalary: actualSalary.toFixed(0),
    };

    const updated = [...employees, newEmployee];

    setEmployees(updated);

    localStorage.setItem(
      key,
      JSON.stringify(updated)
    );

    alert("Employee Added Successfully");

    setEmployeeData({
      name: "",
      designation: "",
      mobile: "",
      presentDays: "",
      otHours: "",
      otDays: "",
      totalDays: "",
      hogSalary: "",
      addHog: "",
      advance: "",
    });

  };

  const deleteEmployee = (index) => {

    const updated =
      employees.filter((_, i) => i !== index);

    setEmployees(updated);

    localStorage.setItem(
      key,
      JSON.stringify(updated)
    );

  };

  return (

    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-xl border-b border-cyan-500/20 z-50">

        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">

          <h1 className="text-3xl md:text-4xl font-black">

            <span className="text-yellow-400">
              PRAMUKH
            </span>

            {" "}

            <span className="text-cyan-400">
              FABRICATION
            </span>

          </h1>

          <div className="flex flex-wrap gap-3 justify-center">

            <button
              onClick={() => setPage("home")}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black hover:scale-105 transition-all"
            >
              HOME
            </button>

            <button
              onClick={() => setPage("services")}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black hover:scale-105 transition-all"
            >
              SERVICES
            </button>

            <button
              onClick={() => setPage("jobs")}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-lime-500 text-black font-black hover:scale-105 transition-all"
            >
              APPLY JOB
            </button>

            <button
              onClick={() => setPage("employee")}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-red-500 text-black font-black hover:scale-105 transition-all"
            >
              EMPLOYEES
            </button>

            <button
              onClick={() => setPage("contact")}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-400 to-fuchsia-500 text-black font-black hover:scale-105 transition-all"
            >
              CONTACT
            </button>

            <button
              onClick={() => setPage("admin")}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white font-black hover:scale-105 transition-all"
            >
              ADMIN PANEL
            </button>

            {!isLoggedIn ? (

              <>

                <button
                  onClick={() => setShowLogin(true)}
                  className="px-5 py-3 rounded-2xl bg-white text-black font-black hover:scale-105 transition-all"
                >
                  LOGIN
                </button>

                <button
                  onClick={() => setShowSignup(true)}
                  className="px-5 py-3 rounded-2xl bg-lime-400 text-black font-black hover:scale-105 transition-all"
                >
                  SIGNUP
                </button>

              </>

            ) : (

              <button
                onClick={() => {

                  localStorage.removeItem("pf-user");
                  localStorage.removeItem("pf-admin");

                  setIsLoggedIn(false);
                  setIsAdmin(false);

                }}
                className="px-5 py-3 rounded-2xl bg-red-700 text-white font-black hover:scale-105 transition-all"
              >
                LOGOUT
              </button>

            )}

          </div>

        </div>

      </nav>

      {/* HOME */}

      {page === "home" && (

        <section
          className="h-screen flex items-center justify-center text-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1800&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 px-4">

            <h1 className="text-6xl md:text-8xl font-black leading-tight">

              <span className="text-yellow-400">
                PRAMUKH
              </span>

              <br />

              <span className="text-cyan-400">
                FABRICATION
              </span>

            </h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-300">
              Premium Industrial Fabrication Company
            </p>

          </div>

        </section>

      )}

      {/* SERVICES */}

      {page === "services" && (

        <section className="pt-40 pb-20 px-6 bg-[#081120] min-h-screen">

          <h2 className="text-5xl font-black text-center mb-16">
            OUR SERVICES
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

            {[
              {
                title: "Heavy Fabrication",
                img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop"
              },
              {
                title: "Industrial Welding",
                img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop"
              },
              {
                title: "Steel Structure",
                img: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop"
              }
            ].map((item, index) => (

              <div
                key={index}
                className="bg-black rounded-3xl overflow-hidden border border-cyan-500/20 hover:-translate-y-3 transition-all duration-300"
              >

                <img
                  src={item.img}
                  className="w-full h-72 object-cover"
                />

                <div className="p-8">

                  <h2 className="text-3xl font-black text-cyan-400 mb-5">
                    {item.title}
                  </h2>

                  <p className="text-gray-400">
                    Premium industrial fabrication solutions with modern technology.
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

      {/* APPLY JOB */}

      {page === "jobs" && (

        <section className="pt-40 min-h-screen bg-[#081120] px-6">

          <h2 className="text-5xl font-black text-center mb-16">
            APPLY JOB
          </h2>

          <div className="max-w-2xl mx-auto bg-black p-10 rounded-3xl">

            <input
              placeholder="Full Name"
              className="w-full p-4 rounded-xl bg-[#081120] border border-green-400 mb-5"
            />

            <input
              placeholder="Email"
              className="w-full p-4 rounded-xl bg-[#081120] border border-green-400 mb-5"
            />

            <input
              placeholder="Experience"
              className="w-full p-4 rounded-xl bg-[#081120] border border-green-400 mb-5"
            />

            <button
              onClick={() =>
                alert("Application Submitted Successfully")
              }
              className="w-full p-4 rounded-xl bg-green-400 text-black font-black hover:scale-105 transition-all"
            >
              SUBMIT APPLICATION
            </button>

          </div>

        </section>

      )}

      {/* CONTACT */}

      {page === "contact" && (

        <section className="pt-40 min-h-screen bg-black px-6">

          <h2 className="text-5xl font-black text-center mb-16">
            CONTACT US
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

            <div className="bg-[#081120] p-10 rounded-3xl border border-cyan-500/20">

              <h2 className="text-3xl text-yellow-400 font-black mb-5">
                EMAIL
              </h2>

              <p className="text-xl break-all">
                pramukhfabrication@gmail.com
              </p>

            </div>

            <div className="bg-[#081120] p-10 rounded-3xl border border-cyan-500/20">

              <h2 className="text-3xl text-cyan-400 font-black mb-5">
                MOBILE
              </h2>

              <p className="text-xl">
                +91 9876543210
              </p>

            </div>

          </div>

        </section>

      )}

      {/* EMPLOYEE */}

      {page === "employee" && (

        <section className="pt-40 min-h-screen bg-black px-6 pb-20">

          <h2 className="text-5xl font-black text-center text-yellow-400 mb-10">
            EMPLOYEE MANAGEMENT
          </h2>

          {!isAdmin ? (

            <div className="text-center text-3xl text-red-400 font-black">
              ONLY ADMIN CAN ACCESS
            </div>

          ) : (

            <div className="max-w-7xl mx-auto">

              <div className="flex flex-wrap gap-5 mb-8">

                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="p-4 rounded-xl bg-[#081120] border border-cyan-400"
                >

                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>

                </select>

                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="p-4 rounded-xl bg-[#081120] border border-cyan-400"
                >

                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>

                </select>

              </div>

              <div className="bg-[#081120] p-8 rounded-3xl">

                <div className="grid md:grid-cols-3 gap-5">

                  <input
                    placeholder="Employee Name"
                    value={employeeData.name}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        name: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    placeholder="Designation"
                    value={employeeData.designation}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        designation: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    placeholder="Mobile"
                    value={employeeData.mobile}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        mobile: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    type="number"
                    placeholder="Present Days"
                    value={employeeData.presentDays}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        presentDays: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    type="number"
                    placeholder="OT Hours"
                    value={employeeData.otHours}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        otHours: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    value={
                      employeeData.otHours
                        ? (Number(employeeData.otHours) / 24).toFixed(1)
                        : ""
                    }
                    readOnly
                    placeholder="OT Days Auto"
                    className="p-4 rounded-xl bg-gray-900 border border-green-400"
                  />

                  <input
                    value={
                      employeeData.presentDays
                        ? (
                          Number(employeeData.presentDays)
                          +
                          (Number(employeeData.otHours || 0) / 24)
                        ).toFixed(1)
                        : ""
                    }
                    readOnly
                    placeholder="Total Days Auto"
                    className="p-4 rounded-xl bg-gray-900 border border-yellow-400"
                  />

                  <input
                    type="number"
                    placeholder="Hog Salary"
                    value={employeeData.hogSalary}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        hogSalary: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    type="number"
                    placeholder="Add Hog"
                    value={employeeData.addHog}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        addHog: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                  <input
                    type="number"
                    placeholder="Advance"
                    value={employeeData.advance}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        advance: e.target.value,
                      })
                    }
                    className="p-4 rounded-xl bg-black border border-cyan-400"
                  />

                </div>

                <button
                  onClick={addEmployee}
                  className="mt-8 px-8 py-4 rounded-2xl bg-yellow-400 text-black font-black hover:scale-105 transition-all"
                >
                  ADD EMPLOYEE
                </button>

              </div>

              <div className="overflow-auto mt-10">

                <table className="w-full min-w-[1200px]">

                  <thead>

                    <tr className="bg-cyan-400 text-black">

                      <th className="p-4">NAME</th>
                      <th className="p-4">DESIGNATION</th>
                      <th className="p-4">MOBILE</th>
                      <th className="p-4">PRESENT</th>
                      <th className="p-4">OT HOURS</th>
                      <th className="p-4">OT DAYS</th>
                      <th className="p-4">TOTAL DAYS</th>
                      <th className="p-4">SALARY</th>
                      <th className="p-4">ADD</th>
                      <th className="p-4">ADVANCE</th>
                      <th className="p-4">ACTUAL</th>
                      <th className="p-4">DELETE</th>

                    </tr>

                  </thead>

                  <tbody>

                    {employees.map((emp, index) => (

                      <tr
                        key={index}
                        className="text-center border-b border-gray-700"
                      >

                        <td className="p-4">{emp.name}</td>
                        <td className="p-4">{emp.designation}</td>
                        <td className="p-4">{emp.mobile}</td>
                        <td className="p-4">{emp.presentDays}</td>
                        <td className="p-4">{emp.otHours}</td>
                        <td className="p-4">{emp.otDays}</td>
                        <td className="p-4">{emp.totalDays}</td>
                        <td className="p-4">₹{emp.hogSalary}</td>
                        <td className="p-4 text-green-400">₹{emp.addHog}</td>
                        <td className="p-4 text-red-400">₹{emp.advance}</td>

                        <td className="p-4 text-yellow-400 font-black">
                          ₹{emp.actualSalary}
                        </td>

                        <td className="p-4">

                          <button
                            onClick={() =>
                              deleteEmployee(index)
                            }
                            className="px-4 py-2 rounded-xl bg-red-500 hover:scale-105 transition-all"
                          >
                            DELETE
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </section>

      )}

      {/* ADMIN PANEL */}

      {page === "admin" && (

        <section className="pt-40 min-h-screen bg-[#081120] px-6">

          <h2 className="text-5xl font-black text-center mb-16 text-red-400">
            ADMIN PANEL
          </h2>

          {!isAdmin ? (

            <div className="max-w-md mx-auto bg-black p-10 rounded-3xl">

              <input
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={(e) =>
                  setAdminEmail(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-[#081120] border border-red-400 mb-5"
              />

              <input
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) =>
                  setAdminPassword(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-[#081120] border border-red-400 mb-5"
              />

              <button
                onClick={() => {

                  if (
                    adminEmail === ADMIN_EMAIL &&
                    adminPassword === ADMIN_PASSWORD
                  ) {

                    localStorage.setItem(
                      "pf-admin",
                      "true"
                    );

                    setIsAdmin(true);

                    alert("Admin Login Success");

                  } else {

                    alert("Wrong Admin Details");

                  }

                }}
                className="w-full p-4 rounded-xl bg-red-500 text-white font-black hover:scale-105 transition-all"
              >
                ADMIN LOGIN
              </button>

            </div>

          ) : (

            <div className="text-center text-4xl text-green-400 font-black">
              ADMIN ACCESS GRANTED
            </div>

          )}

        </section>

      )}

      {/* LOGIN */}

      {showLogin && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

          <div className="bg-[#081120] p-8 rounded-3xl w-full max-w-md">

            <h2 className="text-4xl font-black text-cyan-400 mb-8 text-center">
              LOGIN
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) =>
                setLoginEmail(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-cyan-400 mb-5"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-cyan-400 mb-5"
            />

            <button
              onClick={() => {

                const user =
                  JSON.parse(
                    localStorage.getItem("pf-user-data")
                  );

                if (
                  user &&
                  user.email === loginEmail &&
                  user.password === loginPassword
                ) {

                  localStorage.setItem(
                    "pf-user",
                    "logged"
                  );

                  setIsLoggedIn(true);

                  setShowLogin(false);

                  alert("Login Success");

                } else {

                  alert("Wrong Email or Password");

                }

              }}
              className="w-full p-4 rounded-xl bg-cyan-400 text-black font-black hover:scale-105 transition-all"
            >
              LOGIN
            </button>

            <button
              onClick={() => setShowLogin(false)}
              className="mt-5 w-full text-red-400"
            >
              CLOSE
            </button>

          </div>

        </div>

      )}

      {/* SIGNUP */}

      {showSignup && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

          <div className="bg-[#081120] p-8 rounded-3xl w-full max-w-md">

            <h2 className="text-4xl font-black text-yellow-400 mb-8 text-center">
              SIGNUP
            </h2>

            <input
              placeholder="Name"
              value={signupName}
              onChange={(e) =>
                setSignupName(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-yellow-400 mb-5"
            />

            <input
              placeholder="Email"
              value={signupEmail}
              onChange={(e) =>
                setSignupEmail(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-yellow-400 mb-5"
            />

            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) =>
                setSignupPassword(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-yellow-400 mb-5"
            />

            <button
              onClick={() => {

                localStorage.setItem(
                  "pf-user-data",
                  JSON.stringify({
                    name: signupName,
                    email: signupEmail,
                    password: signupPassword,
                  })
                );

                alert("Account Created");

                setShowSignup(false);

              }}
              className="w-full p-4 rounded-xl bg-yellow-400 text-black font-black hover:scale-105 transition-all"
            >
              CREATE ACCOUNT
            </button>

            <button
              onClick={() => setShowSignup(false)}
              className="mt-5 w-full text-red-400"
            >
              CLOSE
            </button>

          </div>

        </div>

      )}

    </div>

  );

}