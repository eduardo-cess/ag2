console.time("time");

var fs = require('fs');
var u = require('underscore');
var ag = require('./ag_class.js');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

//ag.array_populacao_experimento = [300];

for(aux1 in ag.array_populacao_experimento){
	for(aux2 in u.range(3)){
		ag.qtd_pop = ag.array_populacao_experimento[aux1];
		ag.play_ag(3);//normalização linear
		ag.experimento++;
		ag.zerar_variaveis();
	}
}

var data = ag.array_experimento;

MongoClient.connect("mongodb://localhost:27017/ag3", function(err, db) {
	assert.equal(null, err);
	experimento_collection = db.collection('experimentos_norm_linear');
	for(i in data){
		experimento_collection.insertOne(data[i],{w:1},function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
		});
	}
	db.close();
});

console.timeEnd("time");


