// VARIABLES----------->>>
let choose_file_btn = document.querySelector(".choose_file"),
   nasted_card = document.querySelector(".nasted_card"),
   error = document.querySelector(".error"),
   image = document.querySelector(".img img"),
   filter_btns = document.querySelectorAll(".filter_styles button"),
   file_input = document.querySelector(".input_file"),
   design_btns = document.querySelectorAll(".rotates_flips_btns button"),
   filter_datlais = document.querySelectorAll(".filter_manager .sub-heading"),
   filter_range = document.querySelector(".filter_manager input"),
   reset_btn = document.querySelector(".reset"),
   save_btn = document.querySelector(".save_file"),
   britness = 100, seturation = 100, invertion = 0, greyscale = 0, rotate = 0, verticalScale = 1, horizontalScale = 1;



choose_file_btn.onclick = () => {
   file_input.click()
}

reset_btn.onclick = () => {
   image.style.filter = `brightness(${100}%) grayscale(${0}%) invert(${0}%) saturate(${100}%)`
   image.style.transform = `rotate(${0}deg) scale(${1},${1})`;
}


file_input.onchange = () => {
   loaded_image = file_input.files[0];
   if (loaded_image != null) {
      if (loaded_image.type.split("/")[0] == "image") {
         choose_file_btn.classList.remove("clickme");
         nasted_card.classList.remove("disable");
         image.src = URL.createObjectURL(loaded_image);
      } else {
         error.style.display = "block";
         error.textContent = "Select image file."
         setTimeout(() => {
            error.style.display = "none";
            error.textContent = ""
         }, 3000);
      }
   } else {
      choose_file_btn.classList.add("clickme");
      nasted_card.classList.add("disable");
   }
}


filter_btns.forEach(btn => {
   btn.onclick = () => {

      filter_btns.forEach(e => {
         e.classList.remove("active")
      });
      btn.classList.add("active")
      if (btn.id == "B") {
         filter_range.max = 200;
         filter_datlais[1].innerHTML = `${britness}%`;
         filter_range.value = britness
         filter_datlais[0].setAttribute("selected", "B")
      } else if (btn.id == "S") {
         filter_range.max = 200;
         filter_datlais[1].innerHTML = `${seturation}%`;
         filter_range.value = seturation
         filter_datlais[0].setAttribute("selected", "S")
      } else if (btn.id == "I") {
         filter_range.max = 100;
         filter_range.value = invertion
         filter_datlais[1].innerHTML = `${invertion}%`;
         filter_datlais[0].setAttribute("selected", "I")
      } else {
         filter_range.max = 100;
         filter_range.value = greyscale
         filter_datlais[1].innerHTML = `${greyscale}%`;
         filter_datlais[0].setAttribute("selected", "G")
      }

      filter_datlais[0].innerHTML = btn.textContent;
   }
});

filter_range.oninput = () => {
   filter_datlais[1].innerHTML = `${filter_range.value}%`;
   let selected_filter = filter_datlais[0].getAttribute("selected")
   if (selected_filter == "B") {
      britness = filter_range.value
   } else if (selected_filter == "I") {
      invertion = filter_range.value
   } else if (selected_filter == "S") {
      seturation = filter_range.value
   } else if (selected_filter == "G") {
      greyscale = filter_range.value
   }
   image.style.filter = `brightness(${britness}%) grayscale(${greyscale}%) invert(${invertion}%) saturate(${seturation}%)`
}

design_btns.forEach(btn => {
   btn.onclick = () => {
      console.log("fff");
      if (btn.id == "left") {
         rotate -= 90;
      } else if (btn.id == "right") {
         rotate += 90;
      } else if (btn.id == "vertical") {
         verticalScale = verticalScale == 1 ? -1 : 1;
      } else if (btn.id == "horizontal") {
         horizontalScale = horizontalScale == 1 ? -1 : 1;
      }
      image.style.transform = `rotate(${rotate}deg) scale(${horizontalScale},${verticalScale})`;
   }
});

save_btn.onclick = () => {
   let canvas = document.createElement("canvas");
   canvas.width = image.naturalWidth
   canvas.height = image.naturalHeight
   let ctx = canvas.getContext("2d");
   ctx.filter = `brightness(${britness}%) grayscale(${greyscale}%) invert(${invertion}%) saturate(${seturation}%)`
   ctx.translate(canvas.width / 2, canvas.height / 2)
   ctx.rotate(Math.PI * rotate / 180)
   ctx.scale(horizontalScale, verticalScale)
   ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

   document.querySelector("body").append(canvas)
   let link = document.createElement('a')
   link.download = "image.jpg";
   link.href = canvas.toDataURL()
   link.click()
   console.log(link);
}







