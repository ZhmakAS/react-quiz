import React from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        results: {},
        ifFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                rightAnswerId: 2,
                question: 'What is the color of the sky?',
                id: 1,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Green', id: 4},
                ],
            },
            {
                rightAnswerId: 2,
                question: 'Which year Kharkiv was found?',
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1654', id: 2},
                    {text: '1652', id: 3},
                    {text: '1690', id: 4},
                ],
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {
                    [answerId]: 'success',
                    results
                }
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        ifFinished: true,
                    })
                } else {

                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout()
            }, 1000)

        } else {
            results[question.id] = 'error'
            console.log("Answer errored------")
            this.setState({
                answerState: {
                    [answerId]: 'error',
                    results
                }
            })
            console.log(this.state.results)
        }
    }
    retryHandler = () => {
        this.setState({
            results: {},
            activeQuestion: 0,
            ifFinished: false,
            answerState: null,
        })
    }

    isQuizFinished() {
        console.log(this.state.activeQuestion === this.state.quiz.length)
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer on Questions</h1>


                    {
                        this.state.ifFinished
                            ? <FinishedQuiz
                                onRetry={this.retryHandler}
                                results={this.state.results}
                                quiz={this.state.quiz}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLenght={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz
