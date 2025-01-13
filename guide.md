# Quick Guide for Running the FastAPI Application

## Introduction

This FastAPI application provides two key endpoints:

- `/chat/`: A chatbot endpoint to interact with a medical AI assistant.
- `/create_summary/`: Generates a concise medical history summary for a patient based on structured input.

## How It Works

### Environment Setup

- The app uses OpenAI for AI-based summarization, and API keys are managed via environment variables.
- Models and schemas validate patient data to ensure structured, readable summaries are created.

### Endpoints

- `/chat/`: Accepts a conversation history and user input to return a chatbot response.
- `/create_summary/`: Processes structured patient data and returns a summarized version of the medical history.

### Key Functionalities

- `process_patient_data`: Converts patient data into a readable string.
- `create_medical_summary`: Calls the AI model to summarize medical history.

## Steps to Run


### Install Dependencies

```bash
pip install -r requirements.txt
```

### Set Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
NEBIUS_API_KEY=<your-nebius-api-key>
```

### Run the Server

Start the FastAPI application using uvicorn:

```bash
uvicorn app:app --reload
```

### Test the Endpoints

Open your browser or Postman and navigate to `http://127.0.0.1:8000/docs` for interactive API documentation.

## API Usage Examples

### 1. Chat Endpoint

**POST `/chat/`**

**Request Body:**

```json
{
    "conversation_history": [
        {"role": "system", "content": "You are a helpful medical assistant."},
        {"role": "user", "content": "What are the symptoms of diabetes?"},
        {"role": "assistant", "content": "The symptoms of diabetes include frequent urination, increased thirst, and fatigue."}
    ],
    "user_input": "How is diabetes treated?"
}
```

**Response:**

```json
{
    "bot_reply": "Diabetes is treated with medication, lifestyle changes, and regular monitoring.",
    "conversation_history": [
        {"role": "system", "content": "You are a helpful medical assistant."},
        {"role": "user", "content": "What are the symptoms of diabetes?"},
        {"role": "assistant", "content": "The symptoms of diabetes include frequent urination, increased thirst, and fatigue."},
        {"role": "user", "content": "How is diabetes treated?"},
        {"role": "assistant", "content": "Diabetes is treated with medication, lifestyle changes, and regular monitoring."}
    ]
}
```

### 2. Create Summary Endpoint

**POST `/create_summary/`**

**Request Body:**

```json
{
    "patient_id": "PTDAA9CD",
    "blood_type": "AB-",
    "weight": 76,
    "height": 176,
    "medical_conditions": [
        {
            "condition_name": "Type 2 Diabetes",
            "diagnosis_date": "2022-05-15",
            "status": "Active",
            "severity": "Moderate"
        },
        {
            "condition_name": "Hypertension",
            "diagnosis_date": "2021-11-03",
            "status": "Active",
            "severity": "Mild"
        }
    ],
    "allergies": [
        {
            "allergen_name": "Penicillin",
            "allergen_type": "Drug",
            "reaction": "Hives and difficulty breathing",
            "severity": "Severe",
            "diagnosis_date": "2020-01-15"
        }
    ],
    "medications": [
        {
            "name": "Metformin",
            "dosage": "500mg",
            "frequency": "daily",
            "purpose": "Diabetes management"
        }
    ],
    "surgeries": [
        {
            "type": "Appendectomy",
            "procedure_date": "2015-08-22",
            "status": "Completed"
        }
    ],
    "visits": [
        {
            "date": "2024-12-15",
            "visit_type": "Regular",
            "reason": "Routine check-up",
            "vitals": {
                "heart_rate": 72,
                "blood_pressure": "130/85",
                "temperature": "36.8°C",
                "oxygen_saturation": 98,
                "respiratory_rate": 16,
                "bmi": 24.5
            },
            "duration": 30
        }
    ],
    "createdAt": "2024-12-23T04:37:37.649Z",
    "updatedAt": "2024-12-25T20:16:59.221Z"
}
```

**Response:**

```json
{
    "medical_history": "Patient ID: PTDAA9CD. Blood Type: AB-. Weight: 76kg. Height: 176cm. The patient has the following medical conditions: Type 2 Diabetes (diagnosed on 2022-05-15, severity: Moderate, status: Active), Hypertension (diagnosed on 2021-11-03, severity: Mild, status: Active). Allergies include: Penicillin (Drug allergy, reaction: Hives and difficulty breathing, severity: Severe). The patient is currently prescribed the following medications: Metformin 500mg (taken daily for Diabetes management). The patient has undergone the following surgeries: Appendectomy (performed on 2015-08-22, status: Completed). 1 recorded visits. Latest visit: Regular on 2024-12-15, reason: Routine check-up, duration: 30 minutes. Created on 2024-12-23T04:37:37.649Z and updated on 2024-12-25T20:16:59.221Z."
}
```

## How the Code Works

### `process_patient_data(data)`

Transforms structured patient data into a human-readable string.

### `create_medical_summary(medical_history)`

Uses the AI model to generate a concise summary of the patient's medical history.

### Endpoints

- `/chat/`: Provides a chatbot-like interface.
- `/create_summary/`: Creates a medical summary for healthcare providers.

### Error Handling

Handles API errors with HTTP exceptions to ensure clear debugging.
