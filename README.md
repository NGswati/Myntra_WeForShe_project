
# Myntra Hackathon WE_FOR_SHE

## Introduction
Welcome to our innovative project developed for the Myntra "We for Her" Hackathon. Our project aims to enhance user engagement on the Myntra platform by introducing two key features:
1. **AI-based Price Negotiator**: This feature allows customers to negotiate product prices dynamically within a seller-defined range, making the shopping experience more interactive and engaging.
2. **Snap of the Day (SoTD) Competition**: Users can upload fashion-related photos to Myntra Studio, and other users can like these snaps. If a snap crosses a minimum threshold of likes, the uploader is rewarded with credit points, encouraging daily participation and community engagement.

## Dependencies
The project uses the following technologies:
- **Backend**: Node.js
- **Database**: MySQL
- **Frontend**: React, Tailwind CSS
- **Additional Packages**:
  - `cors`
  - `express`
  - `axios`
  - `mysql2`
- **Deployment**: AWS, GitHub

Ensure you have these dependencies installed before running the project.

## Impact
Our solution targets increased user interaction and retention, especially among younger audiences. By gamifying the shopping experience with dynamic pricing and daily photo competitions, we aim to foster a vibrant and engaged community on the Myntra platform.

## Project Structure
### Frontend
- **Location**: `/frontend`
  - **HTML Files**:
    - `index.html`: The main entry point for the application.
    - `negotiator.html`: Interface for the AI-based price negotiator.
    - `sotd.html`: Page for the Snap of the Day competition.
  - **JavaScript Files**:
    - `main.js`: Contains the core logic for the application.
    - `negotiator.js`: Handles the negotiation logic and interactions.
    - `sotd.js`: Manages the Snap of the Day features, including uploading and voting on snaps.
  - **CSS Files**:
    - `styles.css`: Main stylesheet for the application.
    - `negotiator.css`: Styles specific to the negotiator page.
    - `sotd.css`: Styles specific to the Snap of the Day page.

### Backend
- **Location**: `/data/backend.sql`
  - This SQL file contains the database schema, including tables and queries used for the application.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Note
Please ensure you have all the required dependencies installed and properly configured before running the project. Refer to the `backend.sql` file for detailed database schema and setup. Make sure your MySQL database is set up correctly with the provided schema.

---

Feel free to customize the content to better fit your specific project details and structure.
