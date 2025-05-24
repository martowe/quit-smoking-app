# 🚭 Quit Smoking App

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive, modern web application designed to help you quit smoking and stay motivated throughout your journey. Track your progress, celebrate milestones, and discover the health benefits of being smoke-free with real-time updates and achievement badges.

![App Preview](https://via.placeholder.com/800x400/3cb371/ffffff?text=Quit+Smoking+App+Dashboard)

## ✨ Features

### 🔐 **User Management**
- **Secure Registration & Login**: Protected user accounts with Spring Security
- **Password Encryption**: Secure password storage with BCrypt
- **Session Management**: Automatic session handling and timeout protection

### 📅 **Quit Plan Setup**
- **Custom Quit Date**: Set your personalized quit date and time
- **Smoking Habits Tracking**: Record cigarettes per day and cost per pack
- **Financial Goals**: Set savings targets for motivation
- **Welcome Modal**: Interactive guidance for first-time users

### 📊 **Real-Time Progress Dashboard**
- **Live Timer**: See exactly how long you've been smoke-free (days, hours, minutes, seconds)
- **Money Saved Calculator**: Real-time savings calculations with projections
- **Cigarettes Avoided Counter**: Track cigarettes you didn't smoke
- **Savings Timeline**: View savings from daily to 10-year projections

### 🏆 **Achievement System**
- **Progressive Badges**: Unlock achievements at key milestones (24h, 3 days, 1 week, 1 month, 3 months, 6 months, 1 year)
- **Health Milestones**: Track physiological improvements with progress circles
- **Celebration Notifications**: Toast notifications for newly unlocked achievements
- **Visual Progress Indicators**: Animated progress rings and completion tracking

### 📈 **Health Benefits Tracking**
- **Timeline Milestones**: Visual progress through health improvement stages
  - 20 minutes: Pulse rate normalizes
  - 8 hours: Oxygen levels improve
  - 24 hours: Carbon monoxide eliminated
  - 3 days: Taste and smell improve
  - 3 months: Blood circulation improves
  - 1 year: Heart disease risk reduces
  - And many more...

### 📄 **Reporting & Export**
- **Printable Reports**: Generate comprehensive progress reports
- **PDF Export**: Download your progress for sharing or personal records
- **Detailed Statistics**: Complete breakdown of time, money, and health metrics

### 💡 **Tips & Motivation**
- **Expert Advice**: 11 evidence-based tips for quitting success
- **Craving Management**: Strategies for handling difficult moments
- **Support Resources**: Built-in help modal with guidance

### 🎨 **User Experience**
- **Dark Mode Support**: Toggle between light and dark themes
- **Mobile Responsive**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Professional loading indicators and transitions
- **Error Handling**: Comprehensive error management and user feedback

## 🛠 Tech Stack

### Backend
- **Java 17**: Modern Java features and performance
- **Spring Boot 3.2.0**: Rapid application development framework
- **Spring Data JPA**: Database abstraction and ORM
- **Spring Security**: Authentication and authorization
- **MySQL**: Reliable relational database
- **Maven**: Dependency management and build automation

### Frontend
- **Thymeleaf**: Server-side template engine
- **HTML5/CSS3**: Modern web standards
- **JavaScript ES6+**: Interactive functionality
- **Google Fonts (Poppins)**: Beautiful typography
- **SVG Icons**: Scalable vector graphics

### Architecture
- **MVC Pattern**: Clean separation of concerns
- **RESTful Design**: Standard HTTP methods and status codes
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic encapsulation

## 🚀 Quick Start

### Prerequisites
- **Java 17** or newer ([Download here](https://openjdk.org/projects/jdk/17/))
- **Maven 3.6+** ([Installation guide](https://maven.apache.org/install.html))
- **MySQL 8.0+** ([Download here](https://dev.mysql.com/downloads/mysql/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quit-smoking-app.git
   cd quit-smoking-app
   ```

2. **Set up the database**
   ```sql
   CREATE DATABASE quit_smoking_db;
   CREATE USER 'quit_app_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON quit_smoking_db.* TO 'quit_app_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Configure application properties**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/quit_smoking_db
   spring.datasource.username=quit_app_user
   spring.datasource.password=your_secure_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   
   # JPA Configuration
   spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false
   
   # Security Configuration
   spring.security.user.name=admin
   spring.security.user.password=admin123
   ```

4. **Build and run the application**
   ```bash
   # Build the project
   mvn clean install
   
   # Run the application
   mvn spring-boot:run
   ```

5. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8080`

### Docker Setup (Optional)

```bash
# Build the application
docker build -t quit-smoking-app .

# Run with Docker Compose
docker-compose up -d
```

## 📁 Project Structure

```
quit-smoking-app/
├── src/main/
│   ├── java/com/example/quitsmokingapp/
│   │   ├── QuitsmokingappApplication.java    # Main application class
│   │   ├── config/                           # Configuration classes
│   │   │   ├── SecurityConfig.java          # Spring Security configuration
│   │   │   └── MilestoneConstants.java      # Health milestone definitions
│   │   ├── controller/                       # REST controllers
│   │   │   ├── AuthenticationController.java
│   │   │   ├── QuitPlanController.java
│   │   │   └── TipsController.java
│   │   ├── model/                           # Entity classes
│   │   │   ├── User.java
│   │   │   ├── QuitPlan.java
│   │   │   └── Milestone.java
│   │   ├── repository/                      # Data access layer
│   │   │   ├── UserRepository.java
│   │   │   └── QuitPlanRepository.java
│   │   ├── service/                         # Business logic
│   │   │   ├── UserService.java
│   │   │   └── QuitPlanService.java
│   │   └── util/                           # Utility classes
│   │       └── SmokingCalculatorUtil.java
│   └── resources/
│       ├── static/                         # Static web assets
│       │   ├── css/                       # Stylesheets
│       │   ├── js/                        # JavaScript files
│       │   └── images/                    # Images and icons
│       ├── templates/                     # Thymeleaf templates
│       └── application.properties         # Configuration file
├── target/                                # Compiled classes and build artifacts
├── pom.xml                               # Maven configuration
└── README.md                             # This file
```

## 🎯 Usage Guide

### Getting Started
1. **Register** a new account or **login** with existing credentials
2. **Create your quit plan** by setting:
   - Your quit date and time
   - Daily cigarette consumption
   - Price per pack
   - Financial savings goal

### Tracking Progress
- Visit the **Progress Dashboard** to see real-time statistics
- Watch your **health milestones** progress with visual indicators
- Earn **achievement badges** as you reach important milestones
- Generate **printable reports** to share your success

### Staying Motivated
- Check the **Tips section** for expert advice
- Set up **financial goals** to stay motivated
- Use the **help modal** for guidance and support
- Track **health improvements** over time

## 🔧 Configuration

### Database Configuration
The application supports MySQL by default. To use a different database:

1. Update `pom.xml` with the appropriate JDBC driver
2. Modify `application.properties` with new connection details
3. Update the JPA dialect if necessary

### Security Configuration
- Password encryption uses BCrypt
- Session timeout can be configured in `SecurityConfig.java`
- CSRF protection is enabled by default

### Customization
- Modify milestone definitions in `MilestoneConstants.java`
- Customize UI themes in the CSS files
- Add new achievement badges in `badges.js`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow Java naming conventions
- Write unit tests for new features
- Update documentation for API changes
- Ensure responsive design for UI changes

## 📊 Key Features in Detail

### Milestone System
The app tracks 12 different health milestones based on medical research:
- **Immediate effects** (20 minutes - 24 hours)
- **Short-term benefits** (2-7 days)
- **Medium-term improvements** (2 weeks - 3 months)
- **Long-term health gains** (1 year - 10 years)

### Achievement Badges
Users can unlock 7 progressive badges:
- 🕐 24 Hours
- 📅 3 Days  
- 📆 1 Week
- 📊 2 Weeks
- 🎯 1 Month
- 💪 3 Months
- 🏆 6 Months
- ❤️ 1 Year

### Financial Tracking
- Real-time money saved calculations
- Projections from daily to 10-year savings
- Customizable financial goals
- Visual progress indicators

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify MySQL is running
- Check username/password in `application.properties`
- Ensure database exists

**Application Won't Start**
- Verify Java 17 is installed
- Check Maven dependencies
- Review application logs

**UI Not Loading Properly**
- Clear browser cache
- Check console for JavaScript errors
- Verify static resources are accessible

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Medical research** from various health organizations for milestone data
- **Spring Boot community** for excellent documentation
- **Bootstrap** and **Font Awesome** for UI inspiration
- **WHO** and **CDC** for smoking cessation guidelines

## 📞 Support

- 📧 **Email**: support@quitsmoking-app.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/quit-smoking-app/issues)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/quit-smoking-app/wiki)

---

<div align="center">

**Made with ❤️ to help you quit smoking and live healthier!**

*Your journey to a smoke-free life starts with a single decision. We're here to support you every step of the way.*

[![Give a ⭐️ if this project helped you!](https://img.shields.io/badge/Give%20a%20⭐️%20if%20this%20project%20helped%20you!-yellow)](https://github.com/yourusername/quit-smoking-app)

</div>

