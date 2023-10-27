import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the values from environment variables
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')

cursor = None
connection = None

def initialize_sql():
    global cursor
    global connection

    # Connect to MySQL
    connection = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password
    )
    cursor = connection.cursor()

def create_db():
    try:
        initialize_sql()
        # Create the database if it doesn't exist
        create_db_query = "CREATE DATABASE IF NOT EXISTS pets_matchup"
        cursor.execute(create_db_query)
        cursor.close()
        connection.close()
        return "Database created successfully."

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def delete_database():
    try:
        initialize_sql()
        # Delete the database if it exists
        delete_db_query = "DROP DATABASE IF EXISTS pets_matchup"
        cursor.execute(delete_db_query)
        cursor.close()
        connection.close()
        return "Database deleted successfully."

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def create_tables():
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Create users table
        create_users_table_query = '''
        CREATE TABLE IF NOT EXISTS users (
            id CHAR(36) PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone_number VARCHAR(255)
        )
        '''
        # Create pets table
        create_pets_table_query = '''
        CREATE TABLE IF NOT EXISTS pets (
            id CHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(10) NOT NULL,
            purebred VARCHAR(3) NOT NULL,
            age INT NOT NULL,
            gender VARCHAR(6) NOT NULL,
            country VARCHAR(20) NOT NULL,
            state VARCHAR(20) NOT NULL,
            picture_uri VARCHAR(255) NOT NULL,
            additional_details VARCHAR(255)
        )
        '''

        cursor.execute(create_users_table_query)
        cursor.execute(create_pets_table_query)
        cursor.close()
        connection.close()
        return "Tables created successfully."

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def delete_users_table():
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Delete user table if it exists
        delete_table_query = "DROP TABLE IF EXISTS users"
        cursor.execute(delete_table_query)
        cursor.close()
        connection.close()
        return "Users table deleted successfully."

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def delete_pets_table():
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Delete pets table if it exists
        delete_table_query = "DROP TABLE IF EXISTS pets"
        cursor.execute(delete_table_query)
        cursor.close()
        connection.close()
        return "Pets table deleted successfully."

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)


def create_user(data):
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Insert the user data
        insert_query = '''
        INSERT INTO users (id, full_name, email, password, phone_number)
        VALUES (%s, %s, %s, %s, %s)
        '''
        values = (
            data["id"],
            data["full_name"],
            data["email"],
            data["password"],
            data["phone_number"]
        )
        cursor.execute(insert_query, values)
        connection.commit()
        cursor.close()
        connection.close()
        return "User created successfully."
    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def verify_user(data):
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Fetch user data
        select_query = '''
        SELECT * FROM users
        WHERE email = %s AND password = %s
        '''
        cursor.execute(select_query, (data["email"], data["password"]))
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        if result is None:
            return "User doesn't exist"
        else:
            return "User exists"

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def create_pet(data):
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Insert the pet data
        insert_query = '''
        INSERT INTO pets (id, name, category, purebred, age, gender, country, state, picture_uri, additional_details)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        values = (
            data["id"],
            data["name"],
            data["category"],
            data["purebred"],
            data["age"],
            data["gender"],
            data["country"],
            data["state"],
            data["picture_uri"],
            data["additional_details"]
        )
        cursor.execute(insert_query, values)
        connection.commit()
        cursor.close()
        connection.close()
        return "Pet created successfully."
    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)

def get_pets():
    pets = []
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Retrieve all pets
        select_query = '''
        SELECT id, name, category, purebred, age, gender, country, state, picture_uri, additional_details
        FROM pets
        '''
        cursor.execute(select_query)
        results = cursor.fetchall()
        
        for row in results:
            pet = {
                'id': row[0],
                'name': row[1],
                'category': row[2],
                'purebred': row[3],
                'age': row[4],
                'gender': row[5],
                'country': row[6],
                'state': row[7],
                'picture_uri': row[8],
                'additional_details': row[9]
            }
            pets.append(pet)

        cursor.close()
        connection.close()

    except mysql.connector.Error as error:
         return "Error occurred: " + str(error)
    return pets

def get_pet(pet_id):
    try:
        initialize_sql()
        # Use the database
        use_db_query = "USE pets_matchup"
        cursor.execute(use_db_query)

        # Fetch pet data
        select_query = '''
        SELECT id, name, category, purebred, age, gender, country, state, picture_uri, additional_details FROM pets
        WHERE id = %s
        '''
        cursor.execute(select_query, (pet_id,))
        result = cursor.fetchone()
        if result is None:
            return "Pet doesn't exist"
        pet = {
            'id': result[0],
            'name': result[1],
            'category': result[2],
            'purebred': result[3],
            'age': result[4],
            'gender': result[5],
            'country': result[6],
            'state': result[7],
            'picture_uri': result[8],
            'additional_details': result[9]
        }
        cursor.close()
        connection.close()

    except mysql.connector.Error as error:
        return "Error occurred: " + str(error)
    return pet

if __name__=="__main__":
    #print(create_db())
    #print(create_tables())
    user_data = {}
    user_data["id"] = "1"
    user_data["full_name"] = "Akpotaire Dennis"
    user_data["email"] = "dennisakpo23@gmail.com"
    user_data["password"] = "1234"
    user_data["phone_number"] = "09023457891"
    #print(create_user(user_data))
    #print(verify_user(user_data))
    pet_data = {}
    pet_data["id"] = "1"
    pet_data["name"] = "Dog"
    pet_data["category"] = "Roff"
    pet_data["purebred"] = "Yes"
    pet_data["age"] = "2"
    pet_data["gender"] = "Female"
    pet_data["country"] = "Nigerian"
    pet_data["state"] = "Lagos"
    pet_data["picture_uri"] = "wr235"
    pet_data["additional_details"] = "A lovely and healthy dog"
    #print(create_pet(pet_data))
    #print(get_pets())
    #print(get_pet("1"))
    #print(get_pet("2"))
    #print(delete_users_table())
    #print(verify_user(user_data))
    #print(delete_pets_table())
    #print(get_pets())
    #print(delete_database())
    #print(create_tables())
