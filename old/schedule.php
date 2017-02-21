<?php



echo buildXlsHTML(getPage());

function buildXlsHTML($xlsData)
{
	$date = $_GET['date'];

	$header = 
	'
	<html>
	<head>
	
	<title>זמנים</title>
	
	<style>
		html
		{
			direction: rtl;
			font-family: arial;
		}
		
		body
		{
			background-color: #203030;
			color: #000;
			font-family: arial;
			text-align: center;
		}
		
		td
		{
			background-color: #11cc55;
		}
		
		h1
		{
			color: #11cc55;
		}
		
		/**
		 * Make ugly titles disappear
		 */
		#ctl00_PlaceHolderMain_ucTicketWizard_DriveTimeScheduler_tblDetailsOneWay
		{
			display: none;
		}
		
		/**
		 * Time table style.
		 */
		 #ctl00_PlaceHolderMain_ucTicketWizard_DriveTimeScheduler_grdOneWayTrains
		 {
			margin: 20pt;
		 }
		
		
	</style>
	
	</head>
	
	<body>
	
	<center>
	
	<h1>זמני הרכבת לתאריך '.$date.':</h1>
	
	';
	
	$footer =
	'
	</center
	</body>
	</html>
	';
	
	return $header.$xlsData.$footer;
}

function getPage()
{
	if(!isset($_GET['origin']) ||
	   !isset($_GET['destination']) ||
	   !isset($_GET['date'])) {
		die('Please use the form, invalid inputs.
			 <a href="index.php")">Go to form</a>');
	}

	// Parse _GET variables.
	$originStation 	= $_GET['origin'];
	$destinStation 	= $_GET['destination'];
	$date 		   	= $_GET['date'];

	// Assemble request GET request for rail.co.il.
	$requestString = "";
	$requestString .= "http://www.rail.co.il/HE/DrivePlan/Pages/DrivePlan.aspx?";
	$requestString .= "DrivePlanPage=true&OriginStationId=$originStation&DestStationId=$destinStation";
	$requestString .= "&HoursDeparture=0&MinutesDeparture=0&GoingHourDeparture=true";
	$requestString .= "&ArrivalHourDeparture=false&GoingHourReturn=true&ArrivalHourReturn=false";
	$requestString .= "&IsReturn=false&GoingTrainCln=$date&ReturnningTrainCln=$date";
	$requestString .= "&IsFullURL=true";
	
	$ch = curl_init();	
	
	// Request page without excel.
	requestPage($requestString, $ch);
	
	// Add excel to requestString.
	$requestString .= "&IsExcel=true";
	
	// Request with excel.
	$excelResult = requestPage($requestString, $ch);
	
	curl_close($ch);
	
	// Request again with excel, return result.
	return $excelResult;
}

function requestPage($requestURL, $ch)
{
	// Firefox user agent
	$useragent = "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0";
	
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_URL, $requestURL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	curl_setopt($ch, CURLOPT_COOKIEJAR, '/tmp/cookies.txt');
	curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/cookies.txt');

	$output = curl_exec($ch);
	$info = curl_getinfo($ch);
	
	return $output;
}

?>


