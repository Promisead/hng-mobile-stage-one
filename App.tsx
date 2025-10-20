import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView
} from 'react-native';
import Option from './components/Option';
import { useEffect, useState } from 'react';
import { quizData } from './questions';

export default function App() {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [scoreData, setScoreData] = useState({
    score: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
  });
  const [checkIfSelected, setCheckIfSelected] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setQuestions(quizData);
  }, []);

  let currentQuestion = questions[currentQuestionIndex];

  // 🕒 Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(); // auto move next when timer ends
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    // reset timer for each question
    setTimeLeft(10);

    // progress percentage
    if (questions.length > 0) {
      let percentage = (((currentQuestionIndex + 1) / questions.length) * 100);
      setPercentageComplete(percentage);
    }
  }, [currentQuestionIndex, questions]);

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption || "";
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults(updatedAnswers);
    }

    resetSelection();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevAnswer = userAnswers[currentQuestionIndex - 1] || "";
      setSelectedOption(prevAnswer);
    }
  };

  const resetSelection = () => {
    setCheckIfSelected({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
    setSelectedOption("");
  };

  const calculateResults = (answers: string[]) => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q: any, index: number) => {
      if (!answers[index]) unanswered++;
      else if (answers[index] === q.answer) correct++;
      else incorrect++;
    });

    const score = correct;
    setScoreData({ score, correct, incorrect, unanswered });
    setShowResultModal(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setUserAnswers([]);
    setShowReviewScreen(false);
    setShowResultModal(false);
    setScoreData({ score: 0, correct: 0, incorrect: 0, unanswered: 0 });
    setTimeLeft(10);
  };

  // 🧾 Review Screen
  if (showReviewScreen) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Review Questions</Text>
        <ScrollView style={{ marginTop: 20 }}>
          {questions.map((q: any, i: number) => {
            const userAnswer = userAnswers[i];
            const isCorrect = userAnswer === q.answer;
            return (
              <View key={i} style={styles.reviewCard}>
                <Text style={styles.questionText}>{i + 1}. {q.question}</Text>
                <Text style={{ color: "#004643" }}>Your Answer:
                  <Text style={{
                    color: isCorrect ? "green" : userAnswer ? "red" : "gray",
                    fontWeight: "600"
                  }}> {userAnswer || "Unanswered"}</Text>
                </Text>
                <Text style={{ color: "green" }}>Correct Answer: {q.answer}</Text>
              </View>
            );
          })}
        </ScrollView>

        <TouchableOpacity onPress={restartQuiz} style={styles.btn}>
          <Text style={{ color: "white" }}>Restart Quiz</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        {/* Question Count */}
        <View style={styles.countwrapper}>
          <Text style={{ fontWeight: "600" }}>
            {currentQuestionIndex + 1}/{questions?.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progresswrapper}>
          <View style={[styles.progressBar, { width: `${percentageComplete}%` }]} />
          <View style={styles.progresscount}>
            <Text style={styles.percentage}>{Math.round(percentageComplete)}%</Text>
          </View>
        </View>

        {/* Timer */}
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>⏱ {timeLeft}s</Text>
        </View>

        {/* Question */}
        <View style={styles.questionwrapper}>
          <Text style={{ fontWeight: "500", textAlign: "center" }}>
            {currentQuestion?.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionswrapper}>
          {currentQuestion?.options.map((opt: string, index: number) => (
            <Option
              key={index}
              setSelectedOption={setSelectedOption}
              checkIfSelected={() =>
                setCheckIfSelected({
                  option1: index === 0,
                  option2: index === 1,
                  option3: index === 2,
                  option4: index === 3,
                })
              }
              isSelected={
                (index === 0 && checkIfSelected.option1) ||
                (index === 1 && checkIfSelected.option2) ||
                (index === 2 && checkIfSelected.option3) ||
                (index === 3 && checkIfSelected.option4)
              }
              option={opt}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={[styles.btn, { backgroundColor: "#ABD1C6" }]}
          >
            <Text>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "600" }}>
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Results Modal */}
      <Modal transparent visible={showResultModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#004643" }}>Quiz Complete</Text>
            <Text style={{ marginVertical: 10 }}>Score: {scoreData.score}/{questions.length}</Text>
            <Text>✅ Correct: {scoreData.correct}</Text>
            <Text>❌ Incorrect: {scoreData.incorrect}</Text>
            <Text>⚪ Unanswered: {scoreData.unanswered}</Text>

            <TouchableOpacity
              onPress={() => {
                setShowResultModal(false);
                setShowReviewScreen(true);
              }}
              style={[styles.btn, { marginTop: 20 }]}
            >
              <Text style={{ color: "white" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4e4',
    padding: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    color: "#004643",
  },
  countwrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  questionwrapper: {
    marginTop: 30,
    width: "100%",
    minHeight: 150,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  progresswrapper: {
    width: "100%",
    height: 15,
    backgroundColor: "#ABD1C6",
    borderRadius: 50,
    marginTop: 10,
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#004643",
  },
  progresscount: {
    position: "absolute",
    top: -30,
    right: 0,
  },
  percentage: {
    fontWeight: "600",
    fontSize: 16,
    color: "#004643",
  },
  timerBox: {
    marginTop: 20,
    alignItems: "center",
  },
  timerText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#004643",
  },
  optionswrapper: {
    marginTop: 30,
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    width: "48%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "#004643",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: "600",
    marginBottom: 8,
  },
});
