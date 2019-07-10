# *TravelLog* API Documentation
*This API returns information from a table of places where I have travelled to and allows
POST requests to be made suggested new places to travel to*

## *localhost/travel.php*
**Request Format:** *travel.php?filter={all or visted or novisit}*

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** *represents all the rows in the travel log table*


**Example Request:** *travel.php?filter=all*

**Example Response:**
*Fill in example response in the {}*

```json
{
  [
    {
      "place": "Barcelona",
      "country": "Spain",
      "visited": "0",
      "date": null,
      "interests": "FC Barcelona"
    },
    {
      "place": "Istanbul",
      "country": "Turky",
      "visited": "1",
      "date": "Jun 2007",
      "interests": "Blue Mosque, Hagia Sophia, Amazing Food"
    },
    {
      "place": "Langkawi",
      "country": "Malaysia",
      "visited": "1",
      "date": "Jun 2006",
      "interests": "Scuba Diving"
    },
    {
      "place": "Koala Lumpur",
      "country": "Malaysia",
      "visited": "1",
      "date": "Jun 2006",
      "interests": "Twin Towers"
    },
    {
      "place": "DisneyLand, CA",
      "country": "USA",
      "visited": "1",
      "date": "Jun 2005",
      "interests": "Fear Factor Ride"
    }
  ]
}
```

**Error Handling:**
*required parameter filter of type "all", "visited" or "novisit"*

## *localhost/travel.php*
**Request Format:** *localhost/travel.php?place={place}&country={country}&interests={interests}

**Request Type**: POST

**Returned Data Format**: Plain Text

**Description:** *message represents whether post request was a success or failure*

**Example Request:** *localhost/travel.php?place=Seattle&country=USA&interests=Space Needle*

**Example Response:**
*Fill in example response in the ticks*

```
"successfully posted Seattle, Washington with points of interest: Space Needle to the
travel log."
```

**Error Handling:**
*missing required post parameters: place, country and interests*
