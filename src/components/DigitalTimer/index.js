import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timeClock: 25,
    timeMinuit: 0,
    isTrue: false,
  }

  componentDidMount() {
    this.clearTimerInterval()
  }

  incrementTimeMin = () => {
    const {timeClock, timeMinuit} = this.state
    const timeCompleted = timeClock * 60 === timeMinuit

    if (timeCompleted) {
      this.clearTimerInterval()
      this.setState({isTrue: false})
    } else {
      this.setState(prevState => ({timeMinuit: prevState.timeMinuit + 1}))
    }
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  onStartButton = () => {
    const {timeClock, timeMinuit, isTrue} = this.state
    const timeCompleted = timeClock * 60 === timeMinuit

    if (timeCompleted) {
      this.setState({timeMinuit: 0})
    }
    if (isTrue) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeMin, 1000)
    }
    this.setState(prevState => ({isTrue: !prevState.isTrue}))
  }

  onPlusButton = () => {
    this.setState(prevState => ({timeClock: prevState.timeClock + 1}))
  }

  onMineButton = () => {
    const {timeClock} = this.state

    if (timeClock > 1) {
      this.setState(prevState => ({timeClock: prevState.timeClock - 1}))
    }
  }

  onResetButton = () => {
    this.clearTimerInterval()
    this.setState({
      timeClock: 25,
      timeMinuit: 0,
      isTrue: false,
    })
  }

  getButtonContainer = () => {
    const {isTrue, timeMinuit} = this.state
    const isDisable = timeMinuit > 0
    const startTimer = isTrue ? 'Pause' : 'Start'
    const paly = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pause = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const startImage = isTrue ? pause : paly
    const alt = isTrue ? 'pause icon' : 'play icon'
    return (
      <div className="button-start-reset">
        <div className="button-container">
          <div className="button-container">
            <button type="button" onClick={this.onStartButton}>
              <img src={startImage} alt={alt} />
              {startTimer}
            </button>
          </div>

          <div className="button-container">
            <button type="button" onClick={this.onResetButton}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
            </button>

            <p type="button">Reset</p>
          </div>
        </div>
        <p className="time-description">Set Timer Limit</p>
        <div className="increat-decreat-button-container">
          <button
            type="button"
            onClick={this.onMineButton}
            disabled={isDisable}
          >
            -
          </button>
          <p className="button-description">25</p>
          <button
            type="button"
            onClick={this.onPlusButton}
            disabled={isDisable}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getDigitalTimer = () => {
    const {timeClock, timeMinuit} = this.state
    const totalRemaiingTime = timeClock * 60 - timeMinuit
    const minutes = Math.floor(totalRemaiingTime / 60)
    const seconds = Math.floor(totalRemaiingTime % 60)

    const stringOfMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringOfSecond = seconds > 9 ? seconds : `0${seconds}`

    console.log(`${stringOfMinutes}:${stringOfSecond}`)

    return `${stringOfMinutes}:${stringOfSecond}`
  }

  render() {
    const {isTrue} = this.state
    const timerStatus = isTrue ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="digital-heading">Digital Timer</h1>
        <div className="digital-container">
          <div className="time-display">
            <div className="center-box">
              <h1 className="center-heading">{this.getDigitalTimer()}</h1>
              <p className="center-description">{timerStatus}</p>
            </div>
          </div>
          {this.getButtonContainer()}
        </div>
      </div>
    )
  }
}
export default DigitalTimer
