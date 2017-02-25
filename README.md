# Beats Per Mash Live

Beats Per Mash Live (aka bpm-live) is a virtual midi controller built to jam out with friends over the web. It is the beginning in the search to bridge the gap between musical colaboration and location; focusing on live song making with people on different machines. This is accomplished with Rails 5.0's Action Cable functionality (web sockets). It is currently launched on heroku and you can visit it here: http://bpm-live.herokuapp.com/

## Getting Started

To run bpm-live locally you can clone the repo in a folder destination of your choice.
  '''
  git clone https://github.com/kekoa428/bpm-live.git
  '''
Navigate to the folder:
  '''
  cd bpm-live
  '''
Make sure to bundle to download the necessary gems.
  '''
  bundle
  '''
Create the database and migrate and seed:
  '''
  rake db:create db:migrate db:seed
  '''
Start the server:
  '''
  rails server
  '''
Open in webpage:
  '''
  http://localhost:3000/
  '''
Play!

## Authors

  Thomas Farr
  Richie Yi
  Jaq Phan
  Michael Dumalag
  Brad Harris

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

