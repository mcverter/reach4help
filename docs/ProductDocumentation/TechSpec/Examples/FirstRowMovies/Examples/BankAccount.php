// CLASS: BankAccount
class BankAccount
{
	// Member Variables "Properties of a Class"
	// Holds user's account name
	private $account;
	// Contains user's balance
	private $balance;

	// Constructor
	public function __construct($username)
	{
		$this->account = $username;
		$this->balance = 0;
	}

	// Retrieves accountname
	public function retrieve_name()
	{
		$username = $this->account;
		return $username;
	}

	// Retrieves balance from database
	public function retrieve_balance()
	{
		$query = "SELECT balance FROM bankaccount WHERE username='{$this->account}'";
		if ($value = mysql_result(mysql_query($query), 0))
			$this->balance = $value;
		return $this->balance;
	}

	// Compound interest for a year, returns money gained
	public function compound_interest($money, $interest, $time)
	{
		$money_earned = $money*pow(1+floatval($interest), $time);
		return ($money_earned-$money);
	}

	// Update balance of database
	public function deposit_money($deposit)
	{
		$update_balance = $this->balance + $deposit;
		$query = "UPDATE bankaccount SET balance='{$update_balance}' WHERE username='{$this->account}'";
		mysql_query($query);
	}

	// Reset Balance
	public function reset_balance()
	{
		$this->balance = 0;
		$query = "UPDATE bankaccount SET balance=0 WHERE username='{$this->account}'";
		mysql_query($query);
	}
}

$useraccount = new BankAccount($visitor);
$account = $useraccount->retrieve_name();
$current_balance = $useraccount->retrieve_balance();
$cash = rand(0, 25);