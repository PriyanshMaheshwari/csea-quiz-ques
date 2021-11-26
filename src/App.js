import React, { Component } from "react";
import { Typography, Button, TextField, Autocomplete } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const sampleProfile = {
  qsImageUrl: "",
  qsText: "",
  quiz_code: null,
  qsHint: "",
  qsType: null,
  qsMandatory: true,
  options: [],
  answer: -1,
};

const quiz_codes = [
  "619690427e887a22f9067a59",
  "6196910a7abcf523affc1602",
  "61a08e68d2595b0023984644",
];
class App extends Component {
  state = {
    qsImageUrl: "",
    qsText: "",
    quiz_code: "",
    qsHint: "",
    qsType: null,
    qsMandatory: true,
    options: [{ optionText: "", optionUrl: "" }],
    inputValue: "",
    answer: -1,
  };

  componentDidMount() {
    this.setState(sampleProfile);
  }

  handleFieldChange = (event) => {
    if (["optionText", "optionUrl"].includes(event.target.name)) {
      let options = [...this.state.options];
      options[event.target.id][event.target.name] = event.target.value;
      this.setState({ options });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  addStudy = (event) => {
    event.preventDefault();
    this.setState({
      options: [...this.state.options, { optionText: "", year: "" }],
    });
  };

  removeStudy = (index) => {
    this.state.options.splice(index, 1);
    this.setState({
      options: this.state.options,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
      signal: controller.signal,
    };
    fetch(
      `https://csea-backend.herokuapp.com/api/questions/${this.state.quiz_code}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("response is not ok");
        }
        if (response.status !== 200) {
          throw new Error("Status code is not 200");
        }
        return response.json();
      })
      .then((data)=>alert(data.msg))
      .catch((err) => {
        alert(err);
      })
      .finally(() => clearTimeout(id));
    console.log(this.state);
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70vw",
            // border:'solid',
            // borderColor: purple,
            // borderWidth: "2px",
            marginBottom: "1vh",
            marginTop: "1vh",
            backgroundColor: "whitesmoke",
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            style={{ textAlign: "center" }}
          >
            Add Question
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70vw",
          }}
        >
          <form
            onSubmit={this.handleFormSubmit}
            onChange={this.handleFieldChange}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "2vh",
              }}
            >
              <TextField
                fluid
                label="Enter Question"
                placeholder="What is the question?"
                name="qsText"
                value={this.state.qsText}
                style={{ margin: "auto" }}
                sx={{ width: 300 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "2vh",
              }}
            >
              <TextField
                fluid
                label="Hint if any"
                placeholder="Oh snap!! No hint :("
                name="qsHint"
                value={this.state.qsHint}
                style={{ margin: "auto" }}
                sx={{ width: 300 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "2vh",
              }}
            >
              <TextField
                fluid
                label="Image url for question if any"
                placeholder="https://source.unsplash.com/random"
                name="qsImageUrl"
                value={this.state.qsImageUrl}
                style={{ margin: "auto" }}
                sx={{ width: 300 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "2vh",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={quiz_codes}
                value={this.state.quiz_code}
                onChange={(event, newVal) =>
                  this.setState({ quiz_code: newVal })
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Quiz code" />
                )}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <FormControl>
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                  labelId="question-type-label"
                  id="question-type"
                  value={this.state.qsType}
                  renderInput={(params) => (
                    <TextField {...params} label="Question Type" />
                  )}
                  sx={{ width: 300, margin: "10px" }}
                  onChange={(e) => this.setState({ qsType: e.target.value })}
                >
                  <MenuItem value={"easy"}>Easy</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <FormControl>
                <InputLabel id="correct-answer-label">Answer</InputLabel>
                <Select
                  labelId="correct-answer-label"
                  id="correct-answer"
                  value={this.state.answer}
                  renderInput={(params) => (
                    <TextField {...params} label="Is question mandatory?" />
                  )}
                  sx={{ width: 300, margin: "10px" }}
                  onChange={(e) => this.setState({ answer: e.target.value })}
                >
                  <MenuItem value={-1}>None</MenuItem>
                  <MenuItem value={0}>Option 1</MenuItem>
                  <MenuItem value={1}>Option 2</MenuItem>
                  <MenuItem value={2}>Option 3</MenuItem>
                  <MenuItem value={3}>Option 4</MenuItem>
                  <MenuItem value={4}>Option 5</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <FormControl>
                <InputLabel id="qs-mandatory-label">
                  Is Question Mandatory
                </InputLabel>
                <Select
                  labelId="qs-mandatory-label"
                  id="qs-mandatory"
                  value={this.state.qsMandatory}
                  renderInput={(params) => (
                    <TextField {...params} label="Is question mandatory?" />
                  )}
                  sx={{ width: 300, margin: "10px" }}
                  onChange={(e) =>
                    this.setState({ qsMandatory: e.target.value })
                  }
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "70vw",
                // border:'solid',
                // borderColor: purple,
                // borderWidth: "2px",
                marginBottom: "1vh",
                marginTop: "1vh",
                backgroundColor: "whitesmoke",
              }}
            >
              <Typography
                variant="h4"
                color="primary"
                style={{ textAlign: "center" }}
              >
                Add options
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {this.state.options.map((options, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                    }}
                  >
                    <TextField
                      type="text"
                      id={index}
                      placeholder="Enter the text"
                      name="optionText"
                      label="Option Text"
                      value={options.optionText}
                      style={{ margin: 10 }}
                    />
                    <TextField
                      type="text"
                      id={index}
                      placeholder="https://source.unsplash.com/random"
                      name="optionUrl"
                      label="Option Url"
                      value={options.optionUrl}
                      style={{ margin: 10 }}
                    />
                    <Button onClick={() => this.removeStudy(index)}>
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={this.addStudy}>Add Option</Button>
              <Button
                variant="outlined"
                onClick={(event) => this.handleFormSubmit(event)}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
