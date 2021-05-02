import pymysql
import threading

board_db = pymysql.connect(
    user='root', 
    passwd='root1234', 
    host='ec2-13-125-221-229.ap-northeast-2.compute.amazonaws.com',
    db='board_db', 
    charset='utf8'
)

cursor = board_db.cursor(pymysql.cursors.DictCursor)
sql = "select * from score_top2;"

def startTimer():
    print("Timer")
    timer = threading.Timer(5, startTimer)


    cursor.execute(sql)

    res = cursor.fetchall() 
    for data in res: 
        print(data) 

    timer.start()



#board_db.commit()
#board_db.close()


if __name__ == '__main__':
    startTimer()