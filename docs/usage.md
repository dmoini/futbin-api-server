# Usage

## searchPlayer

---

### Parameters

- `playerName`: String for player name to be searched for.

### Example

```bash
// Request
curl -X GET "localhost:3000/searchPlayer" -H "Content-Type: application/json" -d '{"playerName": "Lionel Messi"}'

// Response
{
  "data": [
    {
      "ID": "371",
      "playerid": "158023",
      "resource_id": "158023",
      "playername": "Lionel Messi",
      "rating": "93",
      "club": "73",
      "league": "16",
      "nation": "52",
      "raretype": "1",
      "rare": "1",
      "playerimage": "158023",
      "position": "RW",
      "club_name": "Paris SG",
      "league_name": "Ligue 1",
      "country_name": "Argentina",
      "common_name": "Messi",
      "pac": "85",
      "sho": "92",
      "pas": "91",
      "dri": "95",
      "def": "34",
      "phy": "65",
      "player_image": "158023"
    }
  ]
}
```

## getPlayerPrice

---

### Parameters

- `resourceId`: Resource ID for specified player.
- `platform`: Platform to search price for. Must be one of the following values: <XB | PS | PC>.

### Example

```bash
// Request
curl -X GET "localhost:3000/getPlayerPrice" -H "Content-Type: application/json" -d '{"resourceId": 158023, "platform": "XB"}'

// Response
{
  "data": {
    "LCPrice": 479000,
    "LCPrice2": 480000,
    "LCPrice3": 481000,
    "updatedon": 158,
    "MinPrice": 68500,
    "MaxPrice": 1300000
  }
}
```

## batchGetPlayerPrice

---

### Parameters

- `resourceIds`: Comma separated string of resource IDs for specified players.
- `platform`: Platform to search price for. Must be one of the following values: <XB | PS | PC>.

### Example

```bash
// Request
curl -X GET "localhost:3000/batchGetPlayerPrice" -H "Content-Type: application/json" -d '{"resourceIds": "158023,20801", "platform": "XB"}'

// Response
{
  "data": {
    "20801": {
      "LCPrice": 695000,
      "LCPrice2": 698000,
      "LCPrice3": 700000,
      "updatedon": 185,
      "MinPrice": 108000,
      "MaxPrice": 2000000
    },
    "158023": {
      "LCPrice": 477000,
      "LCPrice2": 478000,
      "LCPrice3": 480000,
      "updatedon": 110,
      "MinPrice": 68500,
      "MaxPrice": 1300000
    }
  }
}
```
