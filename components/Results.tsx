// components/Results.tsx
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

const Results = ({ answers, restart, total }: any) => {
  const correctCount = answers.filter((a: any) => a?.isCorrect).length;
  const incorrectCount = answers.filter((a: any) => a?.selected !== null && !a?.isCorrect).length;
  const unansweredCount = answers.filter((a: any) => a?.selected === null).length;
  const percentage = total ? ((correctCount / total) * 100).toFixed(1) : '0';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Quiz Complete 🎉</Text>

        <Text style={styles.subtitle}>Your Score: {correctCount}/{total}</Text>

        <Text style={styles.summary}>✅ Correct: {correctCount} | ❌ Incorrect: {incorrectCount} | ⏳ Unanswered: {unansweredCount}</Text>

        <Text style={styles.percent}>Final Score: {percentage}%</Text>

        <Text style={{ marginVertical: 10, fontWeight: '600' }}>Review Answers:</Text>

        {answers.map((item: any, index: number) => (
          <View key={index} style={styles.answerBox}>
            <Text style={{ fontWeight: '600' }}>{index + 1}. {item.question ?? `Question ${index + 1}`}</Text>
            <Text>✅ Correct: {item.correct}</Text>
            <Text style={{ color: item.isCorrect ? 'green' : 'red' }}>
              Your Answer: {item.selected ?? 'Unanswered'}
            </Text>
          </View>
        ))}

        <TouchableOpacity onPress={restart} activeOpacity={0.8} style={styles.btn}>
          <Text style={{ fontWeight: '600' }}>Restart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e4e4',
    padding: 20,
  },
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#004643',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  summary: {
    fontWeight: '500',
    marginBottom: 4,
  },
  percent: {
    fontWeight: '700',
    color: '#004643',
    marginBottom: 16,
  },
  answerBox: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    width: 120,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ABD1C6',
    marginTop: 20,
  },
});
