import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: "",
      calculationText: "",
    };
    this.operations = ["DEL", "+", "-", "*", "/"];
  }
  calculateResult() {
    const text = this.state.resultText;
    console.log(text, eval(text));
    this.setState({
      calculationText: eval(text),
    });
    //BODMAS
    //parse this text
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  }
  buttonPressed(text) {
    // console.log(text);
    if (text == "=") {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      resultText: this.state.resultText + text,
    });
  }
  operate(operations) {
    console.log(operations);
    switch (operations) {
      case "DEL":
        const text = this.state.resultText.split("");
        text.pop();
        this.setState({ resultText: text.join("") });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.resultText.split("").pop();
        console.log(this.operations.indexOf(lastChar), lastChar);
        if (this.operations.indexOf(lastChar) > 0) return;
        if (this.state.text == " " || this.state.text) return;
        this.setState({
          resultText: this.state.resultText + operations,
        });
    }
  }
  render() {
    let rows = [];
    let nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [".", 0, "="],
    ];

    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => {
              this.buttonPressed(nums[i][j]);
            }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      0;
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          key={this.operations[i]}
          onPress={() => this.operate(this.operations[i])}
        >
          <Text style={[styles.btnText, styles.white]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  btn: {
    flex: 1,
    alignItems: "stretch",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  resultText: {
    fontSize: 30,
    color: "black",
  },
  calculationText: {
    fontSize: 24,
    color: "black",
  },
  white: {
    color: "white",
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttons: {
    flexGrow: 7,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#434343",
  },
  operations: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#636363",
  },
});
