import React from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizeById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends React.Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }


    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer on Questions</h1>
                    {
                        this.props.loading || !this.props.quiz ? <Loader/> :
                            this.props.ifFinished
                                ? <FinishedQuiz
                                    onRetry={this.props.retryQuiz}
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                />
                                : <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLenght={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        ifFinished: state.quiz.ifFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizeById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
