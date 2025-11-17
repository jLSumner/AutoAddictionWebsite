var dropdown = document.getElementsByClassName("dropdown-btn");
			for (let i = 0; i < dropdown.length; i++) {
			  dropdown[i].addEventListener("click", function () {
				this.classList.toggle("active");
				var dropdownContent = this.nextElementSibling;
				dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
			  });
			}

			const loadedCategories = {};

			function loadProducts(element) {
			  const category = element.getAttribute("data-category");
			  const container = document.querySelector(".productMain");

			  if (loadedCategories[category]) {
				container.innerHTML = "";
				loadedCategories[category] = false;
				return;
			  }

			  const script = document.createElement("script");
			  script.src = `js/productDisplays/${category}.js`;
			  script.onload = () => {
				switch (category) {
					case "speakers":
						container.innerHTML = getSpeakersHTML();
						break;
					case "subwoofers":
						container.innerHTML = getSubwoofersHTML();
						break;
					case "amplifiers":
						container.innerHTML = getAmplifiersHTML();
						break;
					case "accessories":
						container.innerHTML = getAccessoriesHTML();
						break;
					case "barwork":
						container.innerHTML = getBarworkHTML();
						break;
					case "lighting":
						container.innerHTML = getLightingHTML();
						break;
					case "communication":
						container.innerHTML = getCommunicationHTML();
						break;
					case "suspension":
						container.innerHTML = getSuspensionHTML();
						break;
					case "roofracks":
						container.innerHTML = getRoofracksHTML();
						break;
					case "winches":
						container.innerHTML = getWinchesHTML();
						break;
					case "snorkels":
						contiainer.innerHTML = getSnorkelsHTML();
						break;
					case "solar":
						container.innerHTML = getSolarHTML();
						break;
					case "batteries":
						container.innerHTML = getBatteriesHTML();
						break;
					case "dcdcCharging":
						container.innerHTML = getDcdcChargingHTML();
						break;
					case "acdcCharging":
						container.innerHTML = getAcdcChargingHTML();
						break;
					case "accessoriesSockets":
						container.innerHTML = getAccessoriesSocketsHTML();
						break;
					case "drawers":
						container.innerHTML = getDrawersHTML();
						break;
					case "fridges":
						container.innerHTML = getFridgesHTML();
						break;
					case "boxes":
						container.innerHTML = getBoxesHTML();
						break;
					case "trackers":
						container.innerHTML = getTrackersHTML();
						break;
					case "alarms":
						container.innerHTML = getAlarmsHTML();
						break;
					case "dashCameras":
						container.innerHTML = getDashCamerasHTML();
						break;
					case "liveViewCameras":
						container.innerHTML = getLiveViewCamerasHTML();
						break;
					case "towingMirrors":
						container.innerHTML = getTowingMirrorsHTML();
						break;
					case "electricBrakes":
						container.innerHTML = getElectricBrakesHTML();
						break;
					case "shuroos":
						container.innerHTML = getShuroosHTML();
						break;
					// Add more cases as needed........
				}
				loadedCategories[category] = true;
			  };

			  container.innerHTML = "";
			  for (let key in loadedCategories) {
				loadedCategories[key] = false;
			  }

			  document.body.appendChild(script);
			}