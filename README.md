# PropertyHub Mobile App

A React Native mobile application for the PropertyHub real estate marketplace platform.

## Features

- **Authentication**: Login, signup, and biometric authentication
- **Property Search**: Advanced search with filters and location-based search
- **Property Details**: Comprehensive property information and images
- **Chat System**: Real-time messaging between users and agents
- **Map Integration**: Interactive maps for property locations
- **Booking System**: Property viewing and booking management
- **Payment Integration**: Secure payment processing
- **Offline Support**: Offline property browsing and caching
- **Push Notifications**: Real-time updates and alerts
- **Dark/Light Theme**: Customizable theme support

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- React Native development environment
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PropertyHubMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your actual values:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Supabase Setup**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Set up your database tables (see Database Schema section)
   - Update your environment variables with the project credentials

## Database Schema

The app requires the following Supabase tables:

### Properties Table
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  price_type TEXT CHECK (price_type IN ('rental', 'sale')),
  currency TEXT DEFAULT 'USD',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  bedrooms INTEGER,
  bathrooms INTEGER,
  sqft INTEGER,
  year_built INTEGER,
  property_type TEXT CHECK (property_type IN ('apartment', 'house', 'condo', 'townhouse', 'land')),
  parking BOOLEAN DEFAULT false,
  furnished BOOLEAN DEFAULT false,
  pet_friendly BOOLEAN DEFAULT false,
  features TEXT[],
  images TEXT[],
  amenities TEXT[],
  status TEXT DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  agent_id UUID REFERENCES agents(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'user',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Agents Table
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar TEXT,
  company TEXT,
  license_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Running the App

### Development Mode
```bash
npm start
```

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser
```bash
npm run web
```

## Project Structure

```
PropertyHubMobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React Context providers
│   ├── screens/             # Screen components
│   ├── services/            # API and external services
│   ├── theme/               # Theme configuration
│   ├── config/              # App configuration
│   └── utils/               # Utility functions
├── assets/                  # Images, fonts, and static files
├── App.tsx                  # Main app component
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Key Components

### Authentication
- `AuthContext`: Manages user authentication state
- `LoginScreen`: User login interface
- `SignupScreen`: User registration interface

### Property Management
- `PropertyContext`: Manages property data and state
- `PropertyListScreen`: Displays property listings
- `PropertyDetailScreen`: Shows detailed property information

### Navigation
- Custom tab bar with icons
- Drawer navigation for additional options
- Stack navigation for screen flows

## Configuration

### Theme Customization
The app uses a custom theme system with Material Design 3 support. Modify `src/theme/theme.ts` to customize colors, typography, and spacing.

### API Configuration
Update `src/config/environment.ts` to configure API endpoints and feature flags.

### Supabase Configuration
Configure Supabase in `src/config/supabase.ts` with your project credentials.

## Troubleshooting

### Common Issues

1. **Metro bundler errors**
   ```bash
   npm start -- --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

4. **Environment variables not loading**
   - Ensure `.env` file is in the root directory
   - Restart the development server
   - Check that variable names start with `EXPO_PUBLIC_`

### Debug Mode
Enable debug logging by setting:
```env
EXPO_PUBLIC_LOG_LEVEL=debug
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Changelog

### Version 1.0.0
- Initial release
- Basic authentication
- Property search and browsing
- Chat system
- Map integration
- Theme support "# airbnb" 
