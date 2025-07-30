import"./hoisted.lCUHE6ev.js";const t=document.getElementById("contact-form");t&&t.addEventListener("submit",function(n){n.preventDefault();const e=document.getElementById("name").value,o=document.getElementById("email").value,m=document.getElementById("telefon").value,c=document.getElementById("message").value,a="din.email@eksempel.dk",l=`Kontakt fra ${e}`,d=`
                Navn: ${e}
                Email: ${o}
                Telefon: ${m}

                Besked:
                ${c}
            `,s=`mailto:${a}?subject=${encodeURIComponent(l)}&body=${encodeURIComponent(d)}`;window.location.href=s});
