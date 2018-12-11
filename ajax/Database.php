<?php

/**
 * Class Database
 */
class Database
{
    /**
     * Server Name
     */
    const SERVER_NAME = "localhost";

    /**
     * Username
     */
    const USERNAME = "rio";

    /**
     * Password
     */
    const PASSWORD = "riorio123";

    /**
     * Database Name
     */
    const DB_NAME = "calendar";

    /**
     * Table
     */
    const TABLE_NAME = "calendar";

    /**
     * @var string
     */
    protected $error;

    /**
     * @return mysqli
     */
    protected function getConnection()
    {
        return new mysqli(self::SERVER_NAME, self::USERNAME, self::PASSWORD, self::DB_NAME);
    }

    /**
     * @return bool
     */
    public function createTable()
    {
        $connection = $this->getConnection();
        $result = true;
        $sql = "CREATE TABLE " . self::TABLE_NAME .
            " (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            date DATE NOT NULL, 
            start_time VARCHAR(5) NOT NULL, 
            end_time VARCHAR(5) NOT NULL, 
            event_name VARCHAR(100), 
            email VARCHAR(50) NOT NULL
            )";
        if ($connection->query($sql)) {
            $this->setError(null);
        } else {
            $result = false;
            $this->setError($connection->error);
        }
        $connection->close();
        return $result;
    }

    /**
     * @param $data
     * @return bool
     */
    public function submitData($data)
    {
        $connection = $this->getConnection();
        $result = true;
        if (isset($data["id"])) {
            $sql = "update " . self::TABLE_NAME . " set date='{$data["date"]}',start_time='{$data["start_time"]}',end_time='{$data["end_time"]}',event_name='{$data["event_name"]}',email='{$data["email"]}' where id='{$data["id"]}'";
        } else {
            $sql = "insert into " . self::TABLE_NAME . " values(null,'{$data["date"]}','{$data["start_time"]}','{$data["end_time"]}','{$data["event_name"]}','{$data["email"]}')";
        }
        if ($connection->query($sql)) {
            $this->setError(null);
        } else {
            $result = false;
            $this->setError($connection->error);
        }
        $connection->close();
        return $result;
    }

    /**
     * @return array
     */
    public function getData()
    {
        $connection = $this->getConnection();
        $result = array();
        $resultQuery = $connection->query( "select * from " . self::TABLE_NAME);
        while ($data = $resultQuery->fetch_array(MYSQLI_ASSOC)) {
            $result[] = $data;
        }
        $connection->close();
        return $result;
    }

    /**
     * @param $date
     * @return array
     */
    public function getDataByDate($date)
    {
        $connection = $this->getConnection();
        $result = array();
        $sql = "select * from " . self::TABLE_NAME . " where date='" . $date . "'";
        $resultQuery = $connection->query($sql);
        while ($data = $resultQuery->fetch_array(MYSQLI_ASSOC)) {
            $result[] = $data;
        }
        $connection->close();
        return $result;
    }

    /**
     * @param $date
     * @return array
     */
    public function getDataById($id)
    {
        $connection = $this->getConnection();
        $result = array();
        $sql = "select * from " . self::TABLE_NAME . " where id='" . $id . "'";
        $resultQuery = $connection->query($sql);
        while ($data = $resultQuery->fetch_array(MYSQLI_ASSOC)) {
            $result = $data;
        }
        $connection->close();
        return $result;
    }

    /**
     * @param $id
     * @return bool
     */
    public function deleteData($id)
    {
        $connection = $this->getConnection();
        $result = true;
        $sql = "delete from " . self::TABLE_NAME . " where id='{$id}'";
        if ($connection->query($sql)) {
            $this->setError(null);
        } else {
            $result = false;
            $this->setError($connection->error);
        }
        $connection->close();
        return $result;
    }

    /**
     * @param $error
     * @return void
     */
    public function setError($error)
    {
        $this->error = $error;
    }

    /**
     * @return string
     */
    public function getError()
    {
        return $this->error;
    }
}