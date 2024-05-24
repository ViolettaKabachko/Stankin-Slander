import psycopg2
import psycopg2.extras


class SlanderDataBase:
    def __init__(self, **address):
        self.cur = None
        self.__database = address['database']
        self.__user = address['user']
        self.__password = address['password']
        self.__host = address['host']
        self.__port = address['port']
        self.__info = {
            'database': self.__database,
            'user': self.__user,
            'password': self.__password,
            'host': self.__host,
            'port': self.__port
        }
        self.connection = None

    def connect(self):
        self.connection = psycopg2.connect(**self.__info)
        self.cur = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    def disconnect(self):
        self.connection.close()

    def get_user_by_id(self, user_id):
        self.cur = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        with self.cur as cur:
            cur.execute('''SELECT full_name, bilet, "group", is_monitor, is_admin, email
             FROM users WHERE id = %s''', (user_id,))
            return cur.fetchone()

    def get_user_by_email(self, email):
        self.cur = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        with self.cur as cur:
            cur.execute('''SELECT id, full_name, bilet, "group", is_monitor, is_admin, email, "password"
             FROM users WHERE email = %s''', (email,))
            return cur.fetchone()

    def insert_user(self, name, password, email, bilet):
        self.cur = self.connection.cursor()
        with self.cur as cur:
            try:
                cur.execute('''INSERT INTO users (full_name, bilet, is_monitor, is_admin, email, "password")
                VALUES (%s, %s, %s, %s, %s, %s)''', (name, bilet, False, False, email, password))
                self.connection.commit()
                return {
                    "msg": "success"
                }
            except Exception:
                return {
                    "msg": "Error occurred"
                }

    def get_group_homework(self, group):
        self.cur = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        with self.cur as cur:
            try:
                print(1)
                cur.execute('''SELECT id, subject, homework, notes, term
             FROM homework WHERE "group" = %s''', (group,))
                return {"res": list(map(dict, cur.fetchall())), "msg": "success"}
            except Exception:
                print(2)
                return {
                    "msg": "Error occurred"
                }

    def insert_homework(self, subject, group, homework, notes, date, creator):
        self.cur = self.connection.cursor()
        with self.cur as cur:
            try:
                cur.execute('''INSERT INTO homework
                    ("group", subject, creator, notes, homework, term) 
                    VALUES
                    (
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s
                    )''', (group, subject, creator, notes, homework, date))
                self.connection.commit()
                return {"status": 200, "msg": "success"}
            except Exception:
                return {
                    "msg": "Error occurred"
                }

    def delete_homework_by_id(self, homework_id):
        self.cur = self.connection.cursor()
        with self.cur as cur:
                cur.execute('''DELETE FROM homework WHERE "id" = %s''', (homework_id,))
                self.connection.commit()
                return {"status": 200, "msg": "success"}

    def insert_request(self, group, creator, status):
        self.cur = self.connection.cursor()
        with self.cur as cur:
            try:
                cur.execute('''INSERT INTO request ("group", creator, status)
                VALUES (%s, %s, %s)''', (group, creator, status))
                self.connection.commit()
                return {
                    "msg": "success"
                }
            except Exception:
                return {
                    "msg": "Error occurred"
                }

    def get_requests(self):
        self.cur = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        with self.cur as cur:
            try:
                cur.execute('''SELECT id, "group", creator
                     FROM request WHERE status = \'sent\'''')
                res = list(map(dict, cur.fetchall()))
                for i in res:
                    q = self.get_user_by_id(i['creator'])
                    i['creator_id'] = i['creator']
                    i['creator'] = q['full_name']
                    i['bilet'] = q['bilet']
                return {"res": res, "msg": "success"}
            except Exception:
                return {
                    "msg": "Error occurred"
                }

    def set_request(self, status, request_id):
        self.cur = self.connection.cursor()
        with self.cur as cur:
            try:
                cur.execute('''UPDATE request SET status = %s WHERE "id" = %s''', (status, request_id))
                self.connection.commit()
                return {"msg": "success"}
            except Exception:
                return {
                    "msg": "Error occurred"
                }

    def set_user_monitor(self, user_id, group):
        self.cur = self.connection.cursor()
        with self.cur as cur:
            try:
                cur.execute('''UPDATE users SET (is_monitor, "group") = (true, %s) WHERE "id" = %s''', (group, user_id))
                self.connection.commit()
                return {"msg": "success"}
            except Exception:
                return {
                    "msg": "Error occurred"
                }

    def get_groups(self):
        self.cur = self.connection.cursor()
        with self.cur as cur:
            cur.execute('''select distinct "group" from users where "group" is not null''')
            res = cur.fetchall()
            self.connection.commit()
            return sum(res, tuple())
