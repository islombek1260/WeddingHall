import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Обновляем состояние компонента, чтобы отобразить ошибку
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });

    // Можно также отправить информацию об ошибке на сервер для дальнейшего анализа
    // Например, с помощью сервиса отчетности об ошибках, такого как Sentry
    // sendErrorToServer(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Если произошла ошибка, отображаем запасной контент
      return (
        <div>
          <h2>Произошла ошибка.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>Дополнительная информация: {this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    // Если ошибок нет, просто рендерим дочерние компоненты
    return this.props.children;
  }
}

export default ErrorBoundary;