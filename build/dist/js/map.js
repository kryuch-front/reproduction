ymaps.ready(function(){
	// Создание карты.
	var myMap = new ymaps.Map("map-default", {
		center: [54.876377, 54.397167],
		zoom: 5,
		controls: []
	});

	myMap.behaviors.disable('scrollZoom');

	$('#map-default .map-item').each(function(){
		myPlacemark = new ymaps.Placemark([$(this).attr('data-position-x'), $(this).attr('data-position-y')], {
			url: $(this).attr('data-url'),
			hintContent: $(this).attr('data-name')
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: '/dist/img/ico/map-icon.svg',
			// Размеры метки.
			iconImageSize: [25, 30],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-12, -30]
		});
		
		myMap.geoObjects.add(myPlacemark);
	})
	

	myMap.geoObjects.events.add('click', function (e) {
		window.location.href = e.get('target').properties.get('url');
	});

});


ymaps.ready(function(){
	// Создание карты.
	var mapContacts = new ymaps.Map("js-contacts-map", {
		center: [57.153033, 65.534328],
		zoom: 11,
		controls: []
	});

	mapContacts.behaviors.disable('scrollZoom');

	$('.contacts__map .map-item').each(function(){

		placemark = new ymaps.Placemark([$(this).attr('data-position-x'), $(this).attr('data-position-y')], {
			url: $(this).attr('data-url'),
			hintContent: $(this).attr('data-name')
		}, {
			iconLayout: 'default#image',
			iconImageHref: '/dist/img/ico/map-icon.svg',
			iconImageSize: [25, 30],
			iconImageOffset: [-12, -30]
		});
		
		mapContacts.geoObjects.add(placemark);
	})
	

	mapContacts.geoObjects.events.add('click', function (e) {
		window.location.href = e.get('target').properties.get('url');
	});

});

// ymaps.ready(function(){
// 	var mapRegion = new ymaps.Map('region_map', {
//         center: [65, 100],
//         zoom: 2,
//         type: null,
//         controls: ['zoomControl']
//     },{
//         restrictMapArea: [[10, 10], [85,-160]]
//     });
//     mapRegion.controls.get('zoomControl').options.set({size: 'small'});
//     // Добавим заливку цветом.
//     var pane = new ymaps.pane.StaticPane(mapRegion, {
//         zIndex: 100, css: {
//             width: '100%', height: '100%', backgroundColor: '#ffffff'
//         }
//     });
//     mapRegion.panes.append('white', pane);
//     // Зададим цвета федеральных округов.
//     var districtColors = {
//         cfo: '#ffff6f',
//         szfo: '#54cbba',
//         yfo: '#f9768e',
//         skfo: '#9a5597',
//         pfo: '#30cb05',
//         urfo: '#bac1cc',
//         sfo: '#16acdb',
//         dfo: '#fbc520'
//     };
//     // Зададим подсказки при наведении на федеральный округ.
//     var districtsHints = {
//         cfo: 'ЦФО',
//         szfo: 'СЗФО',
//         yfo: 'ЮФО',
//         skfo: 'СКФО',
//         pfo: 'ПФО',
//         urfo: 'УрФО',
//         sfo: 'СФО',
//         dfo: 'ДФО'
//     };
//     // Создадим балун.
//     var districtBalloon = new ymaps.Balloon(mapRegion);
//     districtBalloon.options.setParent(mapRegion.options);
//     // Загрузим регионы.
//     ymaps.borders.load('RU', {
//         lang: 'ru',
//         quality: 2
//     }).then(function (result) {
//         // Создадим объект, в котором будут храниться коллекции с нашими регионами.
//         var districtCollections = {};
//         // Для каждого федерального округа создадим коллекцию.
//         for (var district in districtColors) {
//             districtCollections[district] = new ymaps.GeoObjectCollection(null, {
//                 fillColor: districtColors[district],
//                 strokeColor: districtColors[district],
//                 strokeOpacity: 0.3,
//                 fillOpacity: 0.3,
//                 hintCloseTimeout: 0,
//                 hintOpenTimeout: 0
//             });
//             // Создадим свойство в коллекции, которое позже наполним названиями субъектов РФ.
//             districtCollections[district].properties.districts = [];
//         }

//         result.features.forEach(function (feature) {
//             var iso = feature.properties.iso3166;
//             var name = feature.properties.name;
//             var district = districtByIso[iso];
//             // Для каждого субъекта РФ зададим подсказку с названием федерального округа, которому он принадлежит.
//             feature.properties.hintContent = districtsHints[district];
//             // Добавим субъект РФ в соответствующую коллекцию.
//             districtCollections[district].add(new ymaps.GeoObject(feature));
//             // Добавим имя субъекта РФ в массив.
//             districtCollections[district].properties.districts.push(name);

//         });
//         // Создадим переменную, в которую будем сохранять выделенный в данный момент федеральный округ.
//         var highlightedDistrict;
//         for (var districtName in districtCollections) {
//             // Добавим коллекцию на карту.
//             mapRegion.geoObjects.add(districtCollections[districtName]);
//             // При наведении курсора мыши будем выделять федеральный округ.
//             districtCollections[districtName].events.add('mouseenter', function (event) {
//                 var district = event.get('target').getParent();
//                 district.options.set({fillOpacity: 1});
//             });
//             // При выводе курсора за пределы объекта вернем опции по умолчанию.
//             districtCollections[districtName].events.add('mouseleave', function (event) {
//                 var district = event.get('target').getParent();
//                 if (district !== highlightedDistrict) {
//                     district.options.set({fillOpacity: 0.3});
//                 }
//             });
//             // Подпишемся на событие клика.
//             districtCollections[districtName].events.add('click', function (event) {
//                 var target = event.get('target');
//                 var district = target.getParent();
//                 // Если на карте выделен федеральный округ, то мы снимаем с него выделение.
//                 if (highlightedDistrict) {
//                     highlightedDistrict.options.set({fillOpacity: 0.3})
//                 }
//                 // Откроем балун в точке клика. В балуне будут перечислены регионы того федерального округа,
//                 // по которому кликнул пользователь.
//                 districtBalloon.open(event.get('coords'), district.properties.districts.join('<br>'));
//                 // Выделим федеральный округ.
//                 district.options.set({fillOpacity: 1});
//                 // Сохраним ссылку на выделенный федеральный округ.
//                 highlightedDistrict = district;
//             });
//         }
//     })
// });
