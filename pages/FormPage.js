import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import Sidebar from "@/src/components/ui/sidebar";

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState("Basic Config");
  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const closeModal = () => setOpenModal(null);

  const [basicConfigFormData, setBasicConfigFormData] = useState({
    appName: "",
    description: "",
  });

  const [ragConfigurations, setRAGConfigurations] = useState([]);
  const [rAGFormData, setRAGFormData] = useState({
    knowledgeBaseName: "",
    description: "",
    pattern: "",
    embeddings: "",
    metrics: "",
    chunking: "",
    vectorDB: "",
  });

  const handleBasicConfigChange = (e) => {
    setBasicConfigFormData({
      ...basicConfigFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRAGChange = (e) => {
    setRAGFormData({
      ...rAGFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddConfiguration = () => {
    if (!rAGFormData.knowledgeBaseName) {
      alert("Knowledge Base Name is required!");
      return;
    }

    setRAGConfigurations([...ragConfigurations, rAGFormData]);
  };

  const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "0.5px solid grey",
    textAlign: "left",
  };

  const tableCellStyle = {
    padding: "10px",
  };

  const handleClear = () => {
    setBasicConfigFormData({ appName: "", description: "" });
    setRAGFormData({
      knowledgeBaseName: "",
      description: "",
      pattern: "",
      embeddings: "",
      metrics: "",
      chunking: "",
      vectorDB: "",
    });
  };

  const handleSubmit = async () => {
    if (!basicConfigFormData.appName || !basicConfigFormData.description) {
      alert("All fields are required!");
      return;
    }

    if (
      !rAGFormData.knowledgeBaseName ||
      !rAGFormData.description ||
      !rAGFormData.pattern ||
      !rAGFormData.embeddings ||
      !rAGFormData.metrics ||
      !rAGFormData.chunking ||
      !rAGFormData.vectorDB
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basicConfigFormData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Basic Configuration submitted successfully!");
        setBasicConfigFormData({ appName: "", description: "" });
      } else {
        alert(`Error: ${data.message}`);
      }

      const RAGresponse = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rAGFormData),
      });

      const RAGdata = await RAGresponse.json();

      if (RAGresponse.ok) {
        alert("RAG Configuration submitted successfully!");
        setRAGFormData({
          knowledgeBaseName: "",
          description: "",
          pattern: "",
          embeddings: "",
          metrics: "",
          chunking: "",
          vectorDB: "",
        });
      } else {
        alert(`Error: ${RAGdata.message}`);
      }

      handleClear();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen p-6 bg-gray">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Basic Config" && (
        <div className="flex-1 p-6">
          <div
            style={{
              padding: "20px 20px",
              color: "black",
              fontWeight: "bold",
              padding: "4px",
              borderRadius: "10px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            BASIC CONFIGURATION
          </div>

          <div style={{ padding: "20px 20px" }}>
            <Card style={{ padding: "20px" }}>
              <div>
                <p style={{ color: "grey" }}>Basic Information</p>
              </div>
              <CardContent>
                <div className="space-y-4">
                  <label
                    className="block text-lg font-medium"
                    style={{ padding: "10px 10px" }}
                  >
                    App Name
                  </label>
                  <Input
                    name="appName"
                    value={basicConfigFormData.appName}
                    onChange={handleBasicConfigChange}
                    placeholder="Enter app name"
                    validationMessage="App Name is required!"
                    style={{
                      width: "90%",
                      padding: "10px 10px",
                    }}
                  />

                  <label
                    className="block text-lg font-medium"
                    style={{ padding: "10px 10px" }}
                  >
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={basicConfigFormData.description}
                    onChange={handleBasicConfigChange}
                    placeholder="Add description here..."
                    validationMessage="Description is required!"
                    style={{ width: "90%", padding: "10px 10px" }}
                  />
                </div>
              </CardContent>
            </Card>

            <div
              className="mt-10"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="ghost"
                style={{
                  padding: "7px 10px",
                  width: "300px",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setOpenModal("datasets")}
              >
                Datasets
              </Button>

              <Button
                variant="ghost"
                style={{
                  padding: "7px 10px",
                  width: "300px",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setOpenModal("dataSources")}
              >
                Data sources
              </Button>

              <Button
                variant="ghost"
                style={{
                  padding: "7px 10px",
                  width: "300px",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setOpenModal("promptTemplate")}
              >
                Prompt template
              </Button>

              {openModal && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(5px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 50,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  onClick={closeModal}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "24px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      width: "400px",
                      transform: "scale(0.95)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "8px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {openModal === "datasets"
                          ? "Datasets"
                          : openModal === "dataSources"
                          ? "Data Sources"
                          : "Prompt Template"}
                      </h2>
                      <button
                        style={{
                          fontSize: "20px",
                          color: "#777",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                    </div>
                    <p
                      style={{
                        marginTop: "16px",
                        color: "#666",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                    >
                      {openModal === "datasets"
                        ? "This is the Datasets modal."
                        : openModal === "dataSources"
                        ? "This is the Data Sources modal."
                        : "This is the Prompt Template modal."}
                    </p>

                    <div
                      style={{
                        marginTop: "24px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        style={{
                          padding: "8px 16px",
                          color: "#555",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                        onClick={closeModal}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#f5f5f5")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "white")
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outline"
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  color: "black",
                  border: "1px solid black",
                }}
                disabled
              >
                Previous
              </Button>
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (
                    !basicConfigFormData.appName ||
                    !basicConfigFormData.description
                  ) {
                    alert("All fields are required!");
                    return;
                  }
                  setActiveTab("RAG");
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "RAG" && (
        <div className="flex-1 p-6">
          <div
            style={{
              padding: "20px 20px",
              color: "black",
              fontWeight: "bold",
              borderRadius: "10px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            RAG Configuration
          </div>

          <div style={{ padding: "20px 20px" }}>
            <Card style={{ padding: "20px" }}>
              <div>
                <p style={{ color: "grey" }}>Basic Information</p>
              </div>
              <CardContent>
                <div className="space-y-4">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="block text-lg font-medium">
                      Knowledge base name
                    </label>
                    <Input
                      name="knowledgeBaseName"
                      value={rAGFormData.knowledgeBaseName}
                      onChange={handleRAGChange}
                      placeholder="Enter knowledge base name"
                      validationMessage="Knowledge Base Name is required!"
                      style={{ width: "100%", padding: "10px" }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10px",
                    }}
                  >
                    <label className="block text-lg font-medium">
                      Description
                    </label>
                    <Input
                      name="description"
                      value={rAGFormData.description}
                      onChange={handleRAGChange}
                      placeholder="Enter Description"
                      validationMessage="Description is required!"
                      style={{ width: "100%", padding: "10px" }}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      paddingTop: "10px",
                    }}
                  >
                    <div>
                      <label className="block text-lg font-medium">
                        Pattern
                      </label>
                      <Input
                        name="pattern"
                        value={rAGFormData.pattern}
                        onChange={handleRAGChange}
                        placeholder="Enter category"
                        validationMessage="Pattern is required!"
                        style={{ width: "80%", padding: "10px" }}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium">
                        Embeddings
                      </label>
                      <Input
                        name="embeddings"
                        value={rAGFormData.embeddings}
                        onChange={handleRAGChange}
                        placeholder="Enter description"
                        validationMessage="Embeddings is required!"
                        style={{ width: "80%", padding: "10px" }}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium">
                        Metrics
                      </label>
                      <Input
                        name="metrics"
                        value={rAGFormData.metrics}
                        onChange={handleRAGChange}
                        placeholder="Enter version"
                        validationMessage="Metrics is required!"
                        style={{ width: "80%", padding: "10px" }}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium">
                        Chunking
                      </label>
                      <Input
                        name="chunking"
                        value={rAGFormData.chunking}
                        onChange={handleRAGChange}
                        placeholder="Enter developer name"
                        validationMessage="Chunking is required!"
                        style={{ width: "80%", padding: "10px" }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10px",
                    }}
                  >
                    <label className="block text-lg font-medium">
                      Vector DB
                    </label>
                    <Input
                      name="vectorDB"
                      value={rAGFormData.vectorDB}
                      onChange={handleRAGChange}
                      placeholder="Enter Vector DB"
                      validationMessage="VectorDB is required!"
                      style={{ width: "100%", padding: "10px" }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      style={{
                        padding: "10px 10px",
                        width: "150px",
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid green",
                        cursor: "pointer",
                      }}
                      onClick={handleAddConfiguration}
                    >
                      Add Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {ragConfigurations.length > 0 && (
              <table
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Knowledge Base Name</th>
                    <th style={tableHeaderStyle}>Description</th>
                    <th style={tableHeaderStyle}>Pattern</th>
                    <th style={tableHeaderStyle}>Chunking</th>
                    <th style={tableHeaderStyle}>Embeddings</th>
                    <th style={tableHeaderStyle}>Metrics</th>
                    <th style={tableHeaderStyle}>Vector DB</th>
                  </tr>
                </thead>
                <tbody>
                  {ragConfigurations.map((config, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{config.knowledgeBaseName}</td>
                      <td style={tableCellStyle}>{config.description}</td>
                      <td style={tableCellStyle}>{config.pattern}</td>
                      <td style={tableCellStyle}>{config.chunking}</td>
                      <td style={tableCellStyle}>{config.embeddings}</td>
                      <td style={tableCellStyle}>{config.metrics}</td>
                      <td style={tableCellStyle}>{config.vectorDB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("Basic Config")}
              >
                Previous
              </Button>
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (
                    !rAGFormData.knowledgeBaseName ||
                    !rAGFormData.description ||
                    !rAGFormData.pattern ||
                    !rAGFormData.embeddings ||
                    !rAGFormData.metrics ||
                    !rAGFormData.chunking ||
                    !rAGFormData.vectorDB
                  ) {
                    alert("All fields are required!");
                    return;
                  }
                  setActiveTab("Workflows");
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Workflows" && (
        <div className="flex-1 p-6">
          <div
            style={{
              padding: "20px 20px",
              color: "black",
              fontWeight: "bold",
              borderRadius: "10px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Workflows
          </div>

          <div style={{ padding: "20px 20px" }}>
            <Card style={{ padding: "20px" }}>
              <CardContent>
                <div className="space-y-4">
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2 className="block text-lg font-medium">Workflows</h2>
                      <Button
                        variant="outline"
                        style={{
                          padding: "5px 10px",
                          width: "150px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                      >
                        Add a workflow
                      </Button>
                    </div>
                    <div>
                      <p>No workflows</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                      border: "1px solid black",
                      borderRadius: "10px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <label
                      className="block text-lg font-medium"
                      style={{ padding: "10px 10px" }}
                    >
                      Description
                    </label>
                    <Textarea
                      value={description}
                      placeholder="Type @ to reference a workflow..."
                      onChange={(e) => setDescription(e.target.value)}
                      style={{
                        width: "90%",
                        padding: "10px 10px",
                        height: "100px",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("RAG")}
              >
                Previous
              </Button>
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("Security Overview")}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Security Overview" && (
        <div className="flex-1 p-6">
          <div
            style={{
              padding: "20px 20px",
              color: "black",
              fontWeight: "bold",
              borderRadius: "10px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Security Overview
          </div>

          <div style={{ padding: "20px 20px" }}>
            <Card style={{ padding: "20px" }}>
              <CardContent>
                <div className="space-y-4">
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <p>Advanced Configuration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("Workflows")}
              >
                Previous
              </Button>
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("Overview")}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Overview" && (
        <div className="flex-1 p-6">
          <div
            style={{
              padding: "20px 20px",
              color: "black",
              fontWeight: "bold",
              borderRadius: "10px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Overview
          </div>

          <div style={{ padding: "20px 20px" }}>
            <Card style={{ padding: "20px" }}>
              <CardContent>
                <div className="space-y-4">
                  <p>Form Overview and Submit</p>
                </div>
              </CardContent>
            </Card>

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("Security Overview")}
              >
                Previous
              </Button>
              <Button
                style={{
                  padding: "10px 10px",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
