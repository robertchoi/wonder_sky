import pymysql
import threading
import time

board_db = pymysql.connect(
    user='root', 
    passwd='root1234', 
    host='ec2-13-125-221-229.ap-northeast-2.compute.amazonaws.com',
    db='board_db', 
    charset='utf8'
)

cursor = board_db.cursor(pymysql.cursors.DictCursor)
sql = "select * from score_top2;"
sql_truncate = "truncate score_top2;"
sql_insert = "insert into score_top2(id, scoreValue) select id, sum(tagvalue)-99 from score group by id;"

def startTimer():
    print("Timer")
    timer = threading.Timer(5, startTimer)

    cursor.execute(sql_truncate)
    time.sleep(1)
    cursor.execute(sql_insert)
    time.sleep(1)
    cursor.execute(sql)

    res = cursor.fetchall() 
    for data in res: 
        print(data) 

    timer.start()



#board_db.commit()
#board_db.close()


if __name__ == '__main__':
    startTimer()